import React from 'react'

const Svg = ({width=48,height=48,children}) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  width={width} height={height}>
        {children}
    </svg>
  )
}

export const PostIcons = ({width=48,height=48}) => {
  return (
    <Svg width={width} height={height}>
       <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 14L12.2728 19.3032C12.5856 20.0331 13.5586 20.1103 13.9486 19.4185C14.7183 18.0535 15.8591 15.8522 17 13C19 8 20 4 20 4C20 4 16 5 11 7C8.14784 8.14086 5.94647 9.28173 4.58149 10.0514C3.88975 10.4414 3.96687 11.4144 4.69678 11.7272L10 14Z" stroke="#86efac" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g>
    </Svg>
  )
}

export const HomeIcon = ({ width, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width * 8} height={height * 8} viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    );
}

export const SearchIcon = ({ width, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    );
}

export const WebsiteIcon = ({height=100,width=100,alt}) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" id="amblem" width={width} height={height} viewBox="0 0 64.757 64.724" alt={alt} className='animate-pulse'>
      <ellipse id="Ellipse_1" data-name="Ellipse 1" cx="32.297" cy="32.297" rx="32.297" ry="32.297" transform="translate(0 0.065)" fill="#000000"/>
      <circle id="Ellipse_2" data-name="Ellipse 2" cx="32.362" cy="32.362" r="32.362" transform="translate(0.033)" fill="#000000"/>
      <g id="Group_1" data-name="Group 1" transform="translate(0.033)">
        <path id="Path_5" data-name="Path 5" d="M236.519,483.106a19,19,0,1,1,19.019-19.019,19.019,19.019,0,0,1-19.019,19.019" transform="translate(-204.157 -431.725)" fill="#86efac" fill-rule="evenodd"/>
        <path id="Path_6" data-name="Path 6" d="M244.189,480.38a2.859,2.859,0,0,1-.522.065l3.2,13.18v-13.31a.382.382,0,0,1-.294-.359.393.393,0,0,1,.783,0,.382.382,0,0,1-.294.359v13.31l3.2-13.147a2.534,2.534,0,0,1-.522-.065,2.478,2.478,0,0,1,.555-4.893h1.631a2.478,2.478,0,0,1,.555,4.893,2.852,2.852,0,0,1-.522.065l3.2,13.147v-13.31a.355.355,0,0,1-.294-.359.393.393,0,0,1,.783,0,.382.382,0,0,1-.294.359v13.31l3.2-13.147a2.853,2.853,0,0,1-.522-.065,2.474,2.474,0,0,1,.522-4.893h3.295v-4.372h.816l.359-.587h-1.468c.261-.163,1.174-.685.881-1.4a3.98,3.98,0,0,0-.587-.718,1.242,1.242,0,0,1-.391-1.044l.033-.163a.952.952,0,0,0-.555.2.7.7,0,0,0-.326.489,1.138,1.138,0,0,0,.489.913,1.823,1.823,0,0,1,.685,1.011,1.044,1.044,0,0,1-.261.718h-.163a.818.818,0,0,0,.228-.913c-.2-.457-.652-.718-.848-.979a1.383,1.383,0,0,1-.228-.62s-.522.457-.457.848.685.587.913.75a.981.981,0,0,1,.391.457.717.717,0,0,1-.033.457h-.163a.622.622,0,0,0,.1-.261.507.507,0,0,0-.228-.424,3.016,3.016,0,0,0-.75-.391c-.261-.1-.359-.489-.359-.522a.581.581,0,0,0-.163.489c.065.228.294.326.718.522a1.341,1.341,0,0,1,.62.587H259.62v.587h1.272c0,.1.033.163.033.261a2.45,2.45,0,0,1-2.447,2.447h-.033a2.478,2.478,0,0,1-2.479-2.479v-.2h0v-.228a1.976,1.976,0,1,0-1.664-.033v.261h0v.2a2.478,2.478,0,0,1-2.479,2.479h-1.631a2.478,2.478,0,0,1-2.479-2.479v-.2h0v-.261a1.956,1.956,0,1,0-2.806-1.762,2.044,2.044,0,0,0,1.142,1.794v.228h0v.2a2.478,2.478,0,0,1-2.479,2.479h-.033a2.527,2.527,0,0,1-1.729-.718,2.388,2.388,0,0,1-.718-1.729v-.261h1.272v-.587h-1.4a1.523,1.523,0,0,1,.62-.587c.457-.2.685-.294.718-.522.065-.228-.163-.489-.163-.489a.652.652,0,0,1-.359.522,3.015,3.015,0,0,0-.75.391.507.507,0,0,0-.228.424.622.622,0,0,0,.1.261h-.163a.717.717,0,0,1-.033-.457.981.981,0,0,1,.391-.457c.228-.163.848-.359.913-.75s-.457-.848-.457-.848a1.522,1.522,0,0,1-.228.62c-.2.261-.652.522-.848.979a.785.785,0,0,0,.228.913h0a1.228,1.228,0,0,1-.261-.718c.033-.359.391-.685.685-1.011a1.121,1.121,0,0,0,.457-.913.551.551,0,0,0-.326-.489,1.555,1.555,0,0,0-.587-.2l.033.163a1.3,1.3,0,0,1-.424,1.044,8.557,8.557,0,0,0-.587.718c-.294.718.62,1.24.881,1.4H239.1l.359.587h.816v4.372h3.295A2.478,2.478,0,0,1,246.049,478a2.272,2.272,0,0,1-1.86,2.381" transform="translate(-218.71 -446.615)" fill="#000"/>
      </g>
    </svg>
    )
}

export const TodoIcon = ({ width, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 6h13"></path>
            <path d="M8 12h13"></path>
            <path d="M8 18h13"></path>
            <path d="M3 6h.01"></path>
            <path d="M3 12h.01"></path>
            <path d="M3 18h.01"></path>
        </svg>
    );
}

export const StatsIcon = ({ width, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"></path>
            <path d="M18 17V9"></path>
            <path d="M13 17V5"></path>
            <path d="M8 17v-3"></path>
        </svg>
    );
}