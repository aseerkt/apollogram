import React from 'react'

if (process.env.NODE_ENV !== 'production') {
  import('@welldone-software/why-did-you-render').then((whyDidYouRender) => {
    whyDidYouRender.default(React, {
      trackAllPureComponents: true,
    })
  })
}
