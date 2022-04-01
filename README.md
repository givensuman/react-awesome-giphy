# react-awesome-giphy

### This is a library that acts as a component wrapper for the Giphy API.

To install, run: 

```bash
# with npm
npm i --save react-awesome-giphy
# or with yarn
yarn add react-awesome-giphy
```

Features:

- Highly customizable to match your app's design 💅
- Performant 💪
- Production ready ✔️
- Masonry loadout and lazy-loading built-in 🧱

## Demo 💿
Check out the demo [here](https://react-awesome-giphy.netlify.app)!

## Usage 🍳

The API is simple. Import the component, attach your Giphy API key as a prop, and you're done!

```jsx
import React from 'react'
import Giphy from 'react-awesome-giphy'

const App = () => {
    return (
        <Giphy
            apiKey={process.env.API_KEY}
        />
    )
}
```
renders 👇

![Demo Gif](https://github.com/givensuman/react-awesome-giphy/blob/master/demo/assets/animation.gif?raw=true)

Note that the API key is the only required prop for this component. If you don't have one, you can check out [this official page](https://support.giphy.com/hc/en-us/articles/360020283431-Request-A-GIPHY-API-Key) for more information.

---

### Functional Props 🎣

Perhaps the most important prop is `callback`, which is a function that handles the GIF or sticker data. The callback function you pass is called in the `onClick` of any item displayed in the masonry, and can (and probably should) take the particular item's data as an input. By default, a `console.log` is run.

Here's an imagined example of how to use it:

```jsx
import { Gif } from './components'
const [chat, setChat] = React.useState([])

<Giphy 
    apiKey={process.env.API_KEY}
    callback={item => setChat(state => 
        [...state, <Gif src={item.images.original.url} />]
    )}
/>
```

If you're not sure how to use the Giphy data, try clicking around and inspecting the data yourself in your console.

Additionally, every option available in the Giphy API is accepted as a prop. You can view all of these and their usage [at this official source](https://developers.giphy.com/docs/api/endpoint). These include:

|prop |default |description
|--- |--- |---
|`limit` |12 |The amount of items to return (keep low to optimize performance)
|`offset` |undefined |Starting position of the results
|`rating` |undefined |Allowed [rating content](https://developers.giphy.com/docs/optional-settings/#rating) of the GIFs. Values include 'g', 'pg', 'pg-13', and 'r'
|`randomId` |undefined |A unique ID to specify a user
|`bundle` |undefined |Returns [renditions](https://developers.giphy.com/docs/optional-settings/#renditions-on-demand) matching specified bundle

Lastly, you may want to sync the internal state of this component with your own UI. You can do that with the `openOnStickers` and `displayCallback` props documented below.

|prop |default |description
|--- |--- |---
|`openOnStickers` |false |Determines if the component should open to display GIPHY stickers rather than GIFs
|`displayCallback` |undefined |A callback function that gets called when the display buttons are pressed. Must take the state as an input, which is necessarily either `'gifs'` or `'stickers'`

### Styling Props 🎨

The design of this component is based very heavily on Discord's chat window for GIFs. However, if that doesn't float your boat, there's props for basically every aspect of the theme.

|prop |default |description
|--- |--- |---
|`textColor` |#FEFEFF |Default text color
|`textAltColor` |#AFB1B2|Alternate text coloring
|`bgColor` |#2F3136|Default background color
|`bgAltColor` |#4E4E4E|Alternate background color
|`buttonColor` |#4F535C|Button background color for active and hover states
|`inputColor` |#212325|Input background color
|`accentColor` |#02AEF4|Accent color for item hover states and loading spinner

Here is a diagram laying that out:

![Diagram](https://github.com/givensuman/react-awesome-giphy/blob/master/demo/assets/colors.png?raw=true)

Additional styling props include:

|prop |default |description
|--- |--- |---
|`height` |425 |Height of the component (in px)
|`width` |425 |Width of the component (in px)
|`columns` |2 |Number of columns to split results into

Lastly, there is a `css` prop that can be used to inject css strings directly into component. This targets the component wrapper, so children can be accessed within this prop by their classnames, diagrammed below. Every classname starts with ".giphy" and a double underscore.

![Diagram](https://github.com/givensuman/react-awesome-giphy/blob/master/demo/assets/classes.png?raw=true)

Note that directly overwriting class styles is not recommended. Here is an example of how the `css` prop can be used:

```jsx
const hoverColor = 'lemonchiffon'

<Giphy 
    apiKey={process.env.API_KEY}
    css={`
        box-shadow: -3px 3px 5px lavenderblush;
        &:hover {
            border: solid 1px ${hoverColor};
        }
    `}
/>
```

---

Made with 💙 by Given Suman using:
- React
- Typescript
- Emotion

Check out the [Github]('https://www.github.com/givensuman/react-awesome-giphy').