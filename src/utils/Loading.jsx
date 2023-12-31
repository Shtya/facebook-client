import React from 'react'

const Loading = () => {
  return (
    <div class="main-item">
  <div class="static-background">
    <div class="background-masker btn-divide-left"></div>
  </div>
  
  <div class="animated-background">
    <div class="background-masker btn-divide-left"></div>
  </div>
  
  <div class="shared-dom">
    <div class="sub-rect pure-background"></div>
    <div class="sub-rect pure-background"></div>
    <div class="sub-rect pure-background"></div>
    <div class="sub-rect pure-background"></div>
    <div class="sub-rect pure-background"></div>
    <div class="sub-rect pure-background"></div>
    <div class="sub-rect pure-background"></div>
    <div class="sub-rect pure-background"></div>
  </div>
  
  <div class="css-dom"></div>
</div>
  )
}

export default Loading