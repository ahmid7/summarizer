import useFontFaceObserver from 'use-font-face-observer'

import App from './App'

function AppWrapper() {
  const isFontLoaded = useFontFaceObserver([
		{
				family: "Six Caps",
				weight: "400",
				style: 'normal'
		}
	])

	if(!isFontLoaded) {
		return null
	}

	return (
		<App />
	)
}

export default AppWrapper