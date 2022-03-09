import React, { useState, useEffect, useRef } from 'react'
import { getSomeDataFromUserMainDocument } from '../firestore-methods'
import './style.css'

function TopicsPicker({ handleData, sanitizedData, currentUser }) {
    // console.log(sanitizedData, 'sanitized!!')
    return (
        <div id='container-for-topics-picker'>
            <AllCategories />
            {<AddMoreToCategories scrollBy={650} handleData={handleData} currentUser={currentUser} />}
        </div>
    )
}

export let AddMoreToCategories = ({ scrollBy, handleData, currentUser }) => {
    let [interestsTopics, setInterestsTopics] = useState([])
    let handleLoadingInterestsTopics = (categories) => setInterestsTopics(categories)

    useEffect(() => {
        try {
            getSomeDataFromUserMainDocument(currentUser, handleLoadingInterestsTopics, 'topicsOfInterests')
        } catch (err) {
            console.log(err)
        }
    }, [])

    interestsTopics && console.log(interestsTopics)

    let renderEachAvailableCategory = categoryNames.map(category => {
        for (let key in category) {
            let checkIfItsInUserInterestsTopics = interestsTopics.includes(key)
            // console.log(key, checkIfItsInUserInterestsTopics, interestsTopics, '<<checks>>')
            return checkIfItsInUserInterestsTopics && <RenderSubcategories key={key} name={key} items={category[key]} handleData={handleData} scrollBy={scrollBy} />
        }
    })

    return <div className='category-wrapper-container' style={{ width: scrollBy + 'px' }}>{interestsTopics.length && renderEachAvailableCategory}</div>
}

let RenderSubcategories = ({ name, items, handleData, removeData, scrollBy }) => {
    let [showArrowJustOnce, setShowArrowJustOnce] = useState(false)
    let [totalScrollAmount, setTotalScrollAmount] = useState()
    let [scrollAmount, setScrollAmount] = useState(0)
    let [showBoth, setShowBoth] = useState(false)
    let [currentRoute, setCurrentRoute] = useState('')
    let [categoryID, setCategoryID] = useState('')
    let [categorySelections, setCategorySelection] = useState([]);
    let ref = useRef();

    let handleSelections = (data) => {
        setCategorySelection(prevData => prevData.concat(data))
    }

    let handleRemovalOfSelectections = () => setCategorySelection(prevData => prevData.slice(0, categorySelections.length - 1))

    useEffect(() => categorySelections.length && handleData({ [categoryID]: categorySelections }, categoryID), [categorySelections])

    // categorySelections && console.log(categorySelections, '||')

    let handleCategoryID = () => setCategoryID(name.split(' ').join(''))

    let handleScrollsWithRef = amount => {
        setScrollAmount(ref.current.scrollLeft = amount)
    }

    useEffect(() => {
        setCurrentRoute(window.location.href)
        handleCategoryID();
    }, [])

    useEffect(() => categoryID && setTotalScrollAmount(document.getElementById(categoryID).querySelector('.subcategories-container')?.scrollWidth - scrollBy), [currentRoute])

    let handleRightArrowClick = () => {
        handleScrollsWithRef(scrollAmount + scrollBy <= totalScrollAmount ? scrollAmount + scrollBy : totalScrollAmount);
    }

    let handleLeftArrowClick = () => {
        handleScrollsWithRef(scrollAmount - scrollBy >= 0 ? scrollAmount - scrollBy : 0)
    }

    useEffect(() => {
        scrollAmount && setShowBoth(true)
        scrollAmount == totalScrollAmount && setShowArrowJustOnce(false)
    }, [scrollAmount])

    let handleMouseOnEnter = () => {
        scrollAmount && setShowBoth(true)
        !scrollAmount && setShowArrowJustOnce(true)
    }

    let handleMouseOnLeave = () => {
        setShowBoth(false)
        !scrollAmount && setShowArrowJustOnce(false)
        scrollAmount == totalScrollAmount && setShowArrowJustOnce(false)
    }

    // console.log(showArrowJustOnce, ':once:', showBoth, ':both:')

    let renderSubcategories = items.map(item => <RenderCategoryAsItems key={item} item={item} handleData={handleSelections} removeData={handleRemovalOfSelectections} currentRoute={currentRoute} categoryID={categoryID} />)
    return (
        <div className='categories-options' id={name.split(' ').join('')} style={{ scrollBehavior: 'smooth', width: scrollBy + 'px' }} onMouseEnter={handleMouseOnEnter} onMouseLeave={handleMouseOnLeave}>
            <div className='category-title'>{name}</div>

            {showBoth && <div id='hovered-left' className='highlight-both-arrow-svg' onClick={handleLeftArrowClick} style={{ visibility: scrollAmount ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div>}

            <div className='subcategories-container' ref={ref} style={{ width: scrollBy + 'px' }}>{renderSubcategories}</div>

            {showArrowJustOnce && !showBoth && !scrollAmount && <div id='hovered-right' className='highlight-both-arrow-svg' onClick={handleRightArrowClick}>{rightArrowSvg()}</div>}

            {showBoth && <div id='hovered-right' className='highlight-both-arrow-svg' onClick={handleRightArrowClick} style={{ visibility: (scrollAmount < totalScrollAmount) ? 'visible' : 'hidden' }}>{rightArrowSvg()}</div>}
        </div>
    )
}

let RenderCategoryAsItems = ({ item, handleData, removeData, currentRoute, categoryID }) => {
    let [checked, setChecked] = useState(false)
    
    let markUp;

    let handleClick = () => {
        setChecked(!checked)
    }

    useEffect(() => {
        checked && handleData(item)
        !checked && removeData()
    }, [checked])

    checked
        ?
        markUp = <div className='category-wrapper' onClick={handleClick} style={{ backgroundColor: 'rgb(29, 155, 240)', width: currentRoute == 'http://localhost:8080/i/flow/signup/' && 'auto' }}><div className='category-name'>{item}</div><div className='svg-item' style={{ fill: 'white', display: currentRoute == 'http://localhost:8080/i/flow/signup/' && 'none' }}>{checkMarkSvg()}</div></div>
        :
        markUp = <div className='category-wrapper' onClick={handleClick} style={{ width: currentRoute == 'http://localhost:8080/i/flow/signup/' && 'auto' }} ><div className='category-name'>{item}</div><div className='svg-item' style={{ display: currentRoute == 'http://localhost:8080/i/flow/signup/' && 'none' }}>{plusSvg()}</div></div>

    return markUp;
}

let AllCategories = () => {
    let [showMore, setShowMore] = useState()
    let handleShowMore = (items) => setShowMore(items)

    useEffect(() => {
        setShowMore(6)
    }, [])

    let handleClick = () => handleShowMore(showMore + 6)

    let renderCategories = categoriesList.map((category, idx) => idx < showMore && <CategoryCard key={category.name} item={category.name} />)

    return (
        <div id='container-for-all-categories'>
            <header>Categories</header>
            <div id='categories-wrapper'>{renderCategories}</div>
            <div onClick={handleClick} id='more-cards' style={{ display: showMore >= categoriesList.length && 'none' }}>Show more</div>
        </div>
    )
}

let CategoryCard = ({ item, handleShowMore }) => {
    return (
        <div className='category-card'>
            <div className='category-name'>{item}</div>
        </div>
    )
}

export let categoriesList = [
    { name: 'Fashion & beauty' }, { name: 'Outdoors' }, { name: 'Arts & culture' }, { name: 'Anime & manga' }, { name: 'Business & finance' },
    { name: 'Food' }, { name: 'Travel' }, { name: 'Entertainment' }, { name: 'Music' }, { name: 'Gaming' }, { name: 'Careers' }, { name: 'Home & family' },
    { name: 'Fitness' }, { name: 'Sports' }, { name: 'Technology' }, { name: 'Science' }
]

export let plusSvg = () => <svg width='24px' height='24px'><g><path d="M19.75 11H13V4.25c0-.553-.447-1-1-1s-1 .447-1 1V11H4.25c-.553 0-1 .447-1 1s.447 1 1 1H11v6.75c0 .553.447 1 1 1s1-.447 1-1V13h6.75c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>

export let rightArrowSvg = () => <svg><g><path d="M19.707 11.293l-6-6c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L16.586 11H4c-.553 0-1 .447-1 1s.447 1 1 1h12.586l-4.293 4.293c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293l6-6c.39-.39.39-1.023 0-1.414z"></path></g></svg>

export let leftArrowSvg = () => <svg><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>

export let checkMarkSvg = () => <svg width='24px' height='24px'><g><path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path></g></svg>

export let categoryNames = [
    { 'Fashion & beauty': ['Fashion business', 'Beauty', "Men's style", "Fashion models", 'Jewelry', 'Shoes', 'Gigi hadid', 'Adidas', 'Jeffree star', 'Beauty influencers', 'Fashion', 'Tattoos', 'Makeup', 'Sneakers', 'Shopping', 'PUMA', 'Streetwear', "Women's style", 'Barbara palvin', 'SNKRS', 'Skin care', 'Watches', 'Everyday style', 'Hair care', 'Athletic apparel', 'Handbags', 'Nike', 'Fashion magazines', 'Perfumes & fragrances', 'James charles'] },
    { 'Outdoors': ['Nature', 'Dogs', 'Horses', 'Cats', 'Sailing', 'Sharks', 'Reptiles', 'Beach life', 'Otters', 'Orangutans', 'Environmentalism', 'Birdwatching', 'Fishing', 'Rock climbing', 'Surfing', 'Rabbits', 'Hiking', 'Outdoor brands', 'Mountain biking', 'Scuba diving', 'National parks', 'Pets', 'Animals', 'Dinosaurs', 'Marine life', 'Camping', 'Mountain climbing', 'RVing', 'Gorillas'] },
    { 'Arts & culture': ['Inspirational quotes', 'Horoscope', 'Astrophotography', 'Interior design', 'Screenwriting', 'Aquarius', 'Arts & crafts', 'Taurus', 'Cancer', 'Phototgraphy', 'Books', 'Astrology', 'Scorpio', 'Popular illustrators', 'Animation', 'Art', 'Graphic design', 'Virgo', 'Pisces', 'Libra', 'Anime', 'Famous quotes', 'Comics', 'Health & wellness books', 'Gemini', 'Leo', 'Capricorn', 'Aries', 'Sci-fi & fantasy films', 'Sci-fi & fantasy'] },
    { 'Business & finance': ['Elon Mask', 'Venture capital', 'Marketing', 'Bitcoin cryptocurrency', '$BTC', '$TSLA', 'Chainlink cryptocurrency', 'Litecoin cryptocurrency', 'Dash cryptocurrency', 'Investing', 'Small business', 'Etherium cryptocurrency', 'Business personalities', 'FinTech', 'Ada cryptocurrency', 'Startups', 'Financial services', '$ETH', 'Matic Network cryptocurrency', 'Business News', 'Accounting', 'Business Media', 'Advertising', 'Telecom', 'TRON cryptocurrency', 'Ripple cryptocurrency', 'Tether cryptocurrency', 'Tim Cook', 'Non profit'] },
    { 'Anime & manga': ['Anime', 'Pokemon', 'Naruto', 'Haikyu', 'Kaiju', 'Fire Force', 'Code Geass', 'Bang Dream!', 'Hetalia', 'Pretty Cure', 'Comics', 'Attack on Titan', 'ONE PIECE', 'Jujutsu Kaisen', 'Love Live', 'Lupin The Third', 'Mobile Suit Gundam', "Gintama", 'YU-GI-OH!', 'King Kong', 'Popular Illustrators', 'Hunter x Hunter', 'Dragon Ball', 'Avatar: The Last Airbender', 'Neon Genesis Evangellion', 'Bryan Dechart', 'Sailor Moon', 'Mathew Mercer', 'Hypnosismic', "Fist of the North Star"] },
    { 'Home & family': ['Interior design', 'Gardening', 'Dating', 'Antiques', 'Food Inspiration', 'Vegetarianism', 'BBQ & grill', 'Brunch', 'Houseplants', 'At home', 'Environmentalism', 'Weddings', 'Parenting', 'Organic foods', 'DIY', 'Cooking', 'Baking', 'Spicy food', 'Pens & stationary', 'Arts & crafts', 'Architechture', 'Home Improvement', 'Pets', 'Homeschooling', 'Knitting', 'Seasonal cooking', 'Organic', 'Bread making', 'Model figure'] },
    { 'Food': ['Cooking', 'Food inspiration', 'Food photography', 'Food influencers', 'Tea', 'Coffee', 'Spicy food', 'Cake decoration', 'Asian cuisine', 'Burritos', 'Chefs', 'Organic foods', 'Veganism', 'Cooking videos', 'Brunch', 'Baking', 'Sweets & Deserts', 'Japanese cuisine', 'European cuisine', 'Cheese', 'Fast food', 'Vegeterianism', 'BBQ & grill', 'Seasonal cooking', 'Indian chefs', 'Indian cuisine', 'Bread making', 'Chinese cuisine', 'French cuisine', 'Wingstop'] },
    { 'Fitness': ['Yoga', 'Sporting goods', 'Fitness influencers', 'Crossfit', 'Workout videos', 'Nike', 'Pilates', 'Marathon', 'Ultramarathon', 'Track cycling', 'Cycling', 'Weight training', 'Fitness magazines', 'Athyletic apparel', 'Mindful wellness', 'Addidas', 'AG2R La Mondiale', 'HIIT', 'Spinning', 'Peloton', 'Bodybuilding', 'Running', 'Gym workouts', 'Fitness apps & trackera', 'Cardio', 'PUMA', 'Core fitness', 'Trail running', 'Lower body fitness', 'London Marathon'] },
    { 'Travel': ['Automotive', 'Language learning', 'Air travel', 'Travel news', 'Luxury travel', 'Theme parks', 'Rock climbing', 'India travel', 'Canada travel', 'Greece travel', 'National parks', 'Motorcycles', 'Travel guides', 'Hotels', 'Cuisine travel', 'Road trips', 'Africa travel', 'Las Vegas travel', 'Europe travel', 'China travel', 'Tesla Motors', 'Aviation', 'Business travel', 'Travel bloggers', 'Adventure travel', 'Museums & Institutions', 'Asia Pacific travel', 'Taj Mahal', 'United Kingdom travel', 'Australia travel'] },
    { 'Gaming': ['Video games', 'Game development', 'FIFA', 'Mobile gaming', 'PC gaming', 'Pokemon', 'League of Legends', 'Nintendo', 'PewDiePie', 'Arcade gaming', 'gaming news', 'PlayStation 5', 'Esports', 'Call of Duty', 'Xbox', 'Gaming consoles', 'Epic Games', 'Need for Speed', 'Cyberpunk 2077', 'Animal Crossing', "PlayerUnknown's Battleground", 'Chess', 'PlayStation', 'Gaming influencers', 'Counter-Strike', 'Roleplaying games', 'Fortnite', 'Robolox', 'MrBeast', 'PlayStation 4'] },
    { 'Music': ['Jungkook', 'Rap', 'Classic rock', 'Bollywood rock', 'Jimin', 'Taylor Swift', 'RM', 'Blues', 'Punjabi music', 'K-hip hop', 'BTS', 'Music news', 'Pop', 'EDM', 'Drake', 'Guitar', 'Rihana', 'Grammy Awards', 'Cardi B', 'R&B & soul', 'K-pop', 'Music iundustry', 'Classical music', 'EXO', 'Eminem', 'LISA(BLACKPINK)', 'Rock', 'Hip hop', 'Ariana Grande', 'Justin Beiber'] },
    { 'Entertainment': ['movies', 'Movie news', 'Movies & TV', 'Shah Rukh Khan', 'Entertainment news', 'Drake', 'Eminem', 'Taylor Swift', 'Rihana', 'Screenwriting', 'Celebreties', 'Marques Browniee', 'Bollywood films', 'Bollywood music', 'Bollywood news', 'Sci-fi & fantsy films', 'Ajay Decgn', 'Big Boss', 'Grammy Awards', 'Cardi B', 'Anime', 'Indian actors', 'Comedy', 'Scarlett Johansson', 'Marvel Universe', 'The Oscars', 'Top Gear', 'Digital creators', 'Jennifer Lawrence', 'Comedy films'] },
    { 'Careers': ['Education', 'Construction', 'Advertising', 'Language learning', 'Aviation', 'Mathematics', 'Homeschooling', 'Futurology', 'Carnegi Mellon University', 'California insititute of Technology', 'Accounting', 'History', 'Philosophy', 'Astronauts', 'Economics', 'Graduate school', 'Genealogy', 'Massachusetts Institute of Technology', 'John Hopkins University', 'Stanford University', 'Marketing', 'Online education', 'Job searching & networking', 'Architecture', 'College life', 'Harvard University', 'Indian Institute of technology(IITs)', 'Indian Institute of Management', 'University of Oxford', 'Yale University', ''] },
    { 'Sports': ['Virat Kohli', 'Cristiano Ronaldo', 'UEFA Champions League', 'La Liga', 'Sachin Tendulkar', 'Real Madrid CF', 'FA Cup', 'Marcus Rashford', 'Wayne Rooney', 'Los Angeles Lakers', 'Cricket', 'Premier League', 'Manchester United', 'WWE', 'Chelsea', 'Basketball', 'Liverpool FC', 'Formula 1', 'UEFA Europa League', 'Karim Benzema', 'Lionel Messi', 'Football', 'Sports news', 'FC Barcelona', 'Zenedine Zidane', 'Indian Premier League', 'Juventus FC', 'Rafael Nadal', 'Bruno Fernandes', 'Gareth Bale'] },
    { 'Science': ['Space', 'Weather', 'Biology', 'SpaceX', 'Environmentalism', 'Chemistry', 'Farm life', 'Space agencies & companies', 'Oceanography', 'Volcanoes', 'Agriculture', 'Science news', 'Archaeology', 'Geology', 'Biotech & biomedical', 'Astrophotography', 'Space missions', 'Weather videos', 'Zoology', 'Dinosaurs', 'Physics', 'Psychology', 'Geography', 'Astronauts', 'NASA', 'Supernatural', 'Earthquakes', 'Solar System', 'Space telescopes', 'Exoplanets'] },
    { 'Technology': ['Computer programming', 'Information security', 'Apple', 'Tech personlaities', 'Dogecoin cryptocurrency', 'Cloud computing', 'Open source', 'YouTube', 'Linux', 'FinTech', 'Elon Mask', 'Cybersecurity', 'Android', 'Tech news', 'Etherium cryptocurrency', 'TRON cryptocurrency', 'Virtual reality', 'Ripple cryptocurrency', 'tether cryptocurrency', '$BTC', 'Machine learning', 'Artificial intelligence', 'Bitcoin cryptocurrency', 'Web development', 'Internet of things', 'Data science', 'Databases', 'Augmented reality', 'Ada cryptocurrency', 'Tim Cook']}
]

export default TopicsPicker