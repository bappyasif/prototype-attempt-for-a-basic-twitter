import React from 'react'

let svgStyle = {
    width: "24px", 
    height: "24px"
}

let tagIcon = () => <svg style={svgStyle}><g><path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path></g></svg>

let descriptionIcon = () => <svg style={svgStyle}><g><path d="M19.75 22H4.25C3.01 22 2 20.99 2 19.75V4.25C2 3.01 3.01 2 4.25 2h15.5C20.99 2 22 3.01 22 4.25v15.5c0 1.24-1.01 2.25-2.25 2.25zM4.25 3.5c-.414 0-.75.337-.75.75v15.5c0 .413.336.75.75.75h15.5c.414 0 .75-.337.75-.75V4.25c0-.413-.336-.75-.75-.75H4.25z"></path><path d="M17 8.64H7c-.414 0-.75-.337-.75-.75s.336-.75.75-.75h10c.414 0 .75.335.75.75s-.336.75-.75.75zm0 4.11H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75zm-5 4.11H7c-.414 0-.75-.335-.75-.75s.336-.75.75-.75h5c.414 0 .75.337.75.75s-.336.75-.75.75z"></path></g></svg>

let deleteIcon = (color) => (
    <svg style={{ width: "20px", height: "20px" }}>
      <g>
        <path stroke={color} fill={color} d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
      </g>
    </svg>
  );
  
  let imageIcon = () => (
    <svg style={{ width: "24px", height: "24px" }} stroke='rgb(29, 155, 240)' strokeWidth='.09em'>
      <g>
        <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
        <circle cx="8.868" cy="8.309" r="1.542"></circle>
      </g>
    </svg>
  );
  
  let gifIcon = () => (
    <svg style={{ width: "24px", height: "24px" }} stroke='rgb(29, 155, 240)' strokeWidth='.09em'>
      <g>
        <path d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z"></path>
        <path d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z"></path>
      </g>
    </svg>
  );
  
  let pollIcon = () => (
    <svg style={{ width: "24px", height: "24px" }} stroke='rgb(29, 155, 240)' strokeWidth='.09em'>
      <g>
        <path d="M20.222 9.16h-1.334c.015-.09.028-.182.028-.277V6.57c0-.98-.797-1.777-1.778-1.777H3.5V3.358c0-.414-.336-.75-.75-.75s-.75.336-.75.75V20.83c0 .415.336.75.75.75s.75-.335.75-.75v-1.434h10.556c.98 0 1.778-.797 1.778-1.777v-2.313c0-.095-.014-.187-.028-.278h4.417c.98 0 1.778-.798 1.778-1.778v-2.31c0-.983-.797-1.78-1.778-1.78zM17.14 6.293c.152 0 .277.124.277.277v2.31c0 .154-.125.28-.278.28H3.5V6.29h13.64zm-2.807 9.014v2.312c0 .153-.125.277-.278.277H3.5v-2.868h10.556c.153 0 .277.126.277.28zM20.5 13.25c0 .153-.125.277-.278.277H3.5V10.66h16.722c.153 0 .278.124.278.277v2.313z"></path>
      </g>
    </svg>
  );
  
  let copyIcon = () => (
    <svg style={{ width: "24px", height: "24px" }} stroke='rgb(29, 155, 240)' strokeWidth='.09em'>
      <g>
        <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
        <path d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"></path>
        <circle color="rgb(29, 155, 240)" cx="14.738" cy="9.458" r="1.478"></circle>
        <circle color="rgb(29, 155, 240)" cx="9.262" cy="9.458" r="1.478"></circle>
      </g>
    </svg>
  );
  
  let scheduleIcon = (color) => (
    <svg style={{ width: "24px", height: "24px" }} stroke={color ? color : 'rgb(29, 155, 240)'} strokeWidth='.09em'>
      <g>
        <path d="M-37.9 18c-.1-.1-.1-.1-.1-.2.1 0 .1.1.1.2z"></path>
        <path d="M-37.9 18c-.1-.1-.1-.1-.1-.2.1 0 .1.1.1.2zM18 2.2h-1.3v-.3c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v.3H7.7v-.3c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v.3H4.8c-1.4 0-2.5 1.1-2.5 2.5v13.1c0 1.4 1.1 2.5 2.5 2.5h2.9c.4 0 .8-.3.8-.8 0-.4-.3-.8-.8-.8H4.8c-.6 0-1-.5-1-1V7.9c0-.3.4-.7 1-.7H18c.6 0 1 .4 1 .7v1.8c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-5c-.1-1.4-1.2-2.5-2.6-2.5zm1 3.7c-.3-.1-.7-.2-1-.2H4.8c-.4 0-.7.1-1 .2V4.7c0-.6.5-1 1-1h1.3v.5c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-.5h7.5v.5c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-.5H18c.6 0 1 .5 1 1v1.2z"></path>
        <path d="M15.5 10.4c-3.4 0-6.2 2.8-6.2 6.2 0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2 0-3.4-2.8-6.2-6.2-6.2zm0 11c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7c0 2.5-2.1 4.7-4.7 4.7z"></path>
        <path d="M18.9 18.7c-.1.2-.4.4-.6.4-.1 0-.3 0-.4-.1l-3.1-2v-3c0-.4.3-.8.8-.8.4 0 .8.3.8.8v2.2l2.4 1.5c.2.2.3.6.1 1z"></path>
      </g>
    </svg>
  );
  
  let selectIcon = () => <svg style={{ width: "24px", height: "24px"}}><g><path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path></g></svg>
  
  let everybodyIcon = (color) => (
    <svg style={{ width: "24px", height: "24px" }} stroke={color} fill='rgb(29, 155, 240)'>
      <g>
        <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5zM9.047 5.9c-.878.484-1.22.574-1.486.858-.263.284-.663 1.597-.84 1.712-.177.115-1.462.154-1.462.154s2.148 1.674 2.853 1.832c.706.158 2.43-.21 2.77-.142.342.07 2.116 1.67 2.324 2.074.208.404.166 1.748-.038 1.944-.204.196-1.183 1.09-1.393 1.39-.21.3-1.894 4.078-2.094 4.08-.2 0-.62-.564-.73-.848-.11-.284-.427-4.012-.59-4.263-.163-.25-1.126-.82-1.276-1.026-.15-.207-.552-1.387-.527-1.617.024-.23.492-1.007.374-1.214-.117-.207-2.207-1.033-2.61-1.18-.403-.145-.983-.332-.983-.332 1.13-3.652 4.515-6.318 8.52-6.38 0 0 .125-.018.186.14.11.286.256 1.078.092 1.345-.143.23-2.21.99-3.088 1.474zm11.144 8.24c-.21-.383-1.222-2.35-1.593-2.684-.23-.208-2.2-.912-2.55-1.09-.352-.177-1.258-.997-1.267-1.213-.01-.216 1.115-1.204 1.15-1.524.056-.49-1.882-1.835-1.897-2.054-.015-.22.147-.66.31-.81.403-.36 3.19.04 3.556.36 2 1.757 3.168 4.126 3.168 6.873 0 .776-.18 1.912-.282 2.18-.08.21-.443.232-.595-.04z"></path>
      </g>
    </svg>
  );
  
  let peopleIcon = (color) => (
    <svg style={{ width: "24px", height: "24px" }} stroke={color} fill={color} >
      <g>
        <path d="M14.893 22.5H4.213c-.69 0-1.3-.29-1.72-.82-.44-.56-.6-1.32-.42-2.05.87-3.68 4.25-5.82 8.23-5.82.47 0 .93.03 1.38.09-.11.08-.21.17-.31.26-1.31 1.23-1.37 3.29-.14 4.6l3.06 3.24c.18.19.38.36.6.5zm-4.59-10.42c-1.34 0-2.85-.15-3.81-1.25-.8-.92-1.06-2.35-.79-4.35.37-2.81 2.1-4.48 4.6-4.48 2.51 0 4.23 1.67 4.61 4.48.27 2.01.01 3.43-.8 4.36-.96 1.09-2.46 1.24-3.81 1.24z"></path>
        <path d="M21.893 11.8l-4.22 8.51c-.06.12-.14.23-.24.32-.04.04-.09.08-.14.11-.03.02-.05.04-.08.05-.11.07-.23.11-.35.13-.06.01-.13.02-.2.02-.08 0-.17-.01-.25-.03-.08-.02-.16-.05-.23-.08-.06-.03-.11-.06-.16-.09-.06-.05-.12-.1-.18-.16l-.07-.07-3.02-3.2c-.43-.45-.4-1.18.05-1.6.45-.43 1.17-.41 1.6.04l1.97 2.09 3.49-7.04c.28-.56.96-.8 1.52-.51.55.27.78.96.51 1.51z"></path>
      </g>
    </svg>
  );
  
  let mentionedIcon = (color) => (
    <svg style={{ width: "24px", height: "24px" }} fill={color} color='white'>
      <g>
        <path d="M17.23 8.6c0-.85-.69-1.55-1.55-1.55-.37 0-.73.14-1.02.39-.6-.45-1.54-.92-2.85-.92-2.97 0-5.12 2.45-5.12 5.84 0 2.62 1.88 4.75 4.19 4.75 1.42 0 2.48-.53 3.17-1.03.54.62 1.53 1.26 3.32 1.26.05 0 5.05-.06 5.05-5.34 0-5.75-4.67-10.42-10.42-10.42S1.58 6.25 1.58 12 6.25 22.42 12 22.42c2.18 0 3.92-.53 5.65-1.72.28-.19.48-.49.56-.86.06-.35-.01-.68-.21-.97-.19-.29-.5-.49-.85-.54-.36-.06-.72.01-.98.19-1.28.88-2.57 1.27-4.17 1.27-4.29 0-7.79-3.5-7.79-7.79S7.71 4.21 12 4.21s7.79 3.5 7.79 7.79c0 2.15-1.19 2.91-2.31 2.91 0 0-.68 0-.98-.35-.15-.17-.19-.45-.13-.82.86-4.96.86-5.06.86-5.14zm-3.5 2.53v.14c0 .73-.22 1.44-.63 2.02-.4.59-.95.91-1.6.94-1 0-1.67-.75-1.71-1.9-.03-.86.26-1.69.81-2.28.42-.45.96-.71 1.51-.73.95 0 1.57.7 1.62 1.81z"></path>
      </g>
    </svg>
  );

  export {
    tagIcon, descriptionIcon, copyIcon, deleteIcon, everybodyIcon, gifIcon, imageIcon, mentionedIcon, peopleIcon, pollIcon, scheduleIcon, selectIcon
  }