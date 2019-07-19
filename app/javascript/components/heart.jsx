import React from 'react';


export default class Profile extends React.Component{
render(){
    return(
        <svg

xmlns="http://www.w3.org/2000/svg"

xmlnsXlink="http://www.w3.org/1999/xlink"

version="1.1" height="315" width="342" >

 <defs>

  <style type="text/css"><![CDATA[

    .outline { strokeNone; stroke-width:0 }

  ]]></style>

   <g id="heart">

   <path 

    d="M0 200 v-200 h200 

    a100,100 90 0,1 0,200

    a100,100 90 0,1 -200,0

    z" />

  </g>

 </defs>

 <desc>

   a nearly perfect heart

	 made of two arcs and a right angle

 </desc>

  <use xlinkHref="#heart" class="outline " fill="red" />

</svg>
    )
}

}