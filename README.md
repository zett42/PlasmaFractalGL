# PlasmaFractal

<img src="/screenshots/thumbs/SeethingOnWhite.jpg" alt="Screenshot" title="Screenshot" width="150">

Oldschool PlasmaFractal revival with Perlin Noise and WebGL.
Fully customizable via dynamic VueJS based UI. 

Basic algorithm (fragment shader):
- For each pixel, grayscale value is calculated by calling Perlin Noise or other noise functions.
- RGB color is generated by using grayscale value as palette index.
- To produce fractal, calculate noise function multiple times per pixel with increasing frequency and decreasing amplitude.

Animation
- Noise can be mutated by taking a slice of 3D noise and incrementing the Z position over time.
- A turbulence effect can be achieved by incrementing the Z position faster for each octave of fractal.
- Palette can be animated by rotating the palette entries and by blending between random colors.

## [Live demo](https://zett42.github.io/plasmafractal-gl/)
- Double-click to toggle fullscreen.
- Press the "gear" button in the top-left corner to adjust plasma options.
- When you are happy with your settings, share the Permalink with your friends.

### Requirements and browser support:
- Requires WebGL2 support by browser.
- :white_check_mark: Tested successfully with Chrome v77.0.3865.90, Opera v63.0.3368.94, Firefox v69.0.1
- Best performance observed in Chromium-based browsers like Chrome and Opera.
  
### Preset Links
<a href="https://zett42.github.io/plasmafractal-gl/?f=.09&o=12&g=.57&l=2.13&a=5.5&n=p3&pg=0&icp=1&pbf=ib&pfb=ob&ps=.5&pb=.75&pbg=000000&cp=.149_000000_l+.7_8a0000_l+.845_f0c000_ios+.514_000000_i2+.99_8a0000_o2+.77_ff0000_ios+.92_f90000_l&acp=0&ntu=1.69&inm=1&ns=.03&ptde=10.&ptd=.1&ipr=0&prs=.1#">
   <img src="/screenshots/thumbs/Fiery.jpg" alt="Fiery" title="Fiery" width="150">
</a>
<a href="https://zett42.github.io/plasmafractal-gl/?f=.47&o=7&g=.5&l=2.31&a=4.4&n=p3&pg=0&icp=1&pbf=ib&pfb=ob&ps=.5&pb=.75&pbg=000000&cp=.2_6d0b86_ios213+.1_ffffff_io2+.62_ba0c9f_o2+.49_faa3f8_i2&acp=1&ntu=2.23&inm=1&ns=.03&ptde=10.&ptd=10.&ipr=0&prs=.1#">
  <img src="/screenshots/thumbs/DirtyContrastOnWhite.jpg" alt="Dirty Contrast on White - by Nickelartist" title="Dirty Contrast on White - by Nickelartist" width="150">
</a>
<a href="https://zett42.github.io/plasmafractal-gl/?f=.94&o=4&g=.58&l=2&a=3.2&n=p3&pg=0&icp=1&pbf=ib&pfb=ob&ps=.5&pb=.75&pbg=000000&cp=.6_62f8ff_l+.29_000000_i2+.835_000000_l+.55_62f8ff_l+.54_00bcc6_l+.61_00bcc6_o2&acp=1&ntd=5.4&ntu=2.22&prd=120.&ptde=10.&ptd=10.#">
  <img src="/screenshots/thumbs/NeonTapes.jpg" alt="Neon Tapes" title="Neon Tapes" width="150">
</a>
<a href="https://zett42.github.io/plasmafractal-gl/?f=.49&o=11&g=.5&l=2&a=7.4&n=p3&pg=0&icp=1&pbf=ib&pfb=ob&ps=.5&pb=.75&pbg=000000&cp=.47_000000_l+.48_b9faff_l+.48_000000_l+.56_dd2ff0_ios25+.87_000000_l+.05_000000_l+.07_1ab4ce_l+.09_000000_l&acp=1&ntu=2&inm=1&ns=.02&ptde=10.&ptd=5.&ipr=0&prs=.1#">
  <img src="/screenshots/thumbs/Lines-n-clouds.jpg" alt="Lines and Clouds - by Nickelartist" title="Lines and Clouds - by Nickelartist" width="150">
</a>
<a href="https://zett42.github.io/plasmafractal-gl/?f=.15&o=7&g=.55&l=2&a=4.5&n=p3&pg=0&icp=0&pbf=ios&pfb=ob&ps=.69&pb=1&pbg=000000&cp=0_000000_i2+.25_00bfff_o2+.5_000000_i2+.75_dc0000_o2&acp=0&ntu=1.56&inm=1&ns=.02&ptde=10.&ptd=10.&ipr=1&prs=.01#">
  <img src="/screenshots/thumbs/LavaLamp.jpg" alt="Lava Lamp" title="Lava Lamp" width="150">
</a>
<a href="https://zett42.github.io/plasmafractal-gl/?f=5.43&o=2&g=.55&l=3.7&a=3.8&n=v3&pg=0&icp=1&pbf=ios&pfb=ob&ps=.69&pb=1&pbg=000000&cp=0_000000_io2+.34_123538_io2+.715_000000_io4+.75_ffce5b_io2+.777_000000_l&acp=0&ntu=1&inm=1&ns=.09&ptde=10.&ptd=10.&ipr=0&prs=.1#">
  <img src="/screenshots/thumbs/GoldenLines.jpg" alt="Golden Lines" title="Golden Lines" width="150">
</a>
<a href="https://zett42.github.io/plasmafractal-gl/?f=.14&o=5&g=.55&l=3.7&a=4.9&n=c3&pg=0&icp=1&pbf=ios&pfb=ob&ps=.69&pb=1&pbg=000000&cp=0_000000_io2+.34_2e1746_io2+.715_000000_io4+.75_ffce5b_io2+.777_000000_l&acp=0&ntd=6.&ntu=1.83&prd=120.&ptde=10.&ptd=10.#">
  <img src="/screenshots/thumbs/GoldenCircles.jpg" alt="Golden Circles" title="Golden Circles" width="150">
</a>
<a href="https://zett42.github.io/plasmafractal-gl/?n=c3&f=.46&o=7&g=.58&l=2&a=1&pg=0&icp=1&pbf=ib&pfb=ob&ps=.5&pb=1&pbg=000000&cp=.898_000000_l+.292_91ffff_o5+.192_000000_i5+.442_000000_i2+.663_00ffa2_o2&acp=0&inm=1&ns=.05&ntu=1.85&ipr=0&prs=.1&ptde=10.&ptd=5.#">
  <img src="/screenshots/thumbs/Cellular1.jpg" alt="Cellular" title="Cellular" width="150">
</a>
<a href="https://zett42.github.io/plasmafractal-gl/?n=p3&f=.99&o=6&g=.41&l=1.96&a=5.7&pg=0&icp=1&pbf=ib&pfb=ob&ps=.5&pb=.75&pbg=000000&cp=.03_000000_l+.1_ffffff_l+.14_2e2e2e_io4+.68_000000_l+.78_282828_ios23+.76_ffffff_l&acp=0&ntde=3.&ntd=10.&prd=10.&ptde=10.&ptd=5.#">
  <img src="/screenshots/thumbs/MilkGrey.jpg" alt="milk greY - by Nickelartist" title="milk greY - by Nickelartist" width="150">
</a>
<a href="https://zett42.github.io/plasmafractal-gl/?f=.23&o=14&g=.65&l=2&a=1.1&n=p3&pg=0&icp=1&pbf=ib&pfb=ob&ps=.5&pb=.75&pbg=000000&cp=.69_ffae55_l+.695_481700_o2+.688_481700_l+.23_00485e_l+.233_9bf5ff_l+.237_00485e_o2+.456_000000_i2+.896_000000_i2&acp=0&ptde=10.&ptd=5.&ipr=0&prs=.1&inm=1&ns=.05&ntu=1.46#">
  <img src="/screenshots/thumbs/CosmicEnergy.jpg" alt="Cosmic Energy" title="Cosmic Energy" width="150">
</a>
<a href="https://zett42.github.io/plasmafractal-gl/?n=p3&f=.96&o=12&g=.5&l=2&a=1&pg=0&icp=1&pbf=ib&pfb=ob&ps=.5&pb=1&pbg=000000&cp=0_9b896f_io2+0_948167_io2_f8*o6*g.5*l2*a.5*s.5+.723_333c4d_l&acp=0&inm=1&ns=.05&ntu=1.67&ipr=0&prs=.1&ptde=10.&ptd=5.#">
  <img src="/screenshots/thumbs/AgateBlueYellow.jpg" alt="Agate Blue/Yellow" title="Agate Blue/Yellow" width="150">
</a>

## Credits
This project uses the following open source libraries. Each library comes with its own license terms, which can be found in the source code included in this project.

- [Wombat](https://github.com/BrianSharpe/Wombat) - An efficient texture-free GLSL procedural noise library
  - by Brian Sharpe
    - http://briansharpe.wordpress.com
    - https://github.com/BrianSharpe
    
- [noisejs](https://github.com/josephg/noisejs) - A speed-improved perlin and simplex noise algorithms for 2D. 
  - Based on example code by Stefan Gustavson (stegu@itn.liu.se). 
  - Optimisations by Peter Eastman (peastman@drizzle.stanford.edu). 
  - Better rank ordering method by Stefan Gustavson in 2012. 
  - Converted to Javascript by Joseph Gentle.
 
- [Vue.js](https://vuejs.org/)
  - Copyright (c) 2013-present, Yuxi (Evan) You 

- [Bootstrap](https://getbootstrap.com/) 
  - Copyright (c) 2011-2019 Twitter, Inc.
  - Copyright (c) 2011-2019 The Bootstrap Authors

- [Bootstrap-Vue](https://bootstrap-vue.js.org/)
  - Copyright (c) 2016-2019 - BootstrapVue
  
- [Bootswatch](https://bootswatch.com/)
  - Copyright (c) 2013 Thomas Park
  
- [Popper.js](https://popper.js.org/)
  - Copyright © 2016 Federico Zivolo and contributors

- [jQuery](https://jquery.org/) 
  - Copyright jQuery Foundation and other contributors. 
  
- [jQuery Easing](http://gsgd.co.uk/sandbox/jquery/easing/)
  - Copyright © 2008 George McGinley Smith. All rights reserved.

- [Spectrum Colorpicker](http://briangrinstead.com)
  - Copyright (c) 2014, Brian Grinstead 

- [mersennetwister](https://github.com/pigulla/mersennetwister)
  - Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura, All rights reserved.
  - This implementation by Raphael Pigulla is based on Sean McCullough's port of the original C code written by Makato Matsumoto and Takuji Nishimura.
  
- [tinycolor](https://github.com/bgrins/TinyColor)
  - Copyright (c), Brian Grinstead, http://briangrinstead.com
  
- [nouislider](https://refreshless.com/nouislider/)
  - Copyright (c) 2018 Léon Gersen
  
- [lodash](https://lodash.com/)
  - Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
  - Based on Underscore.js, copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors <http://underscorejs.org/>
  
- [ResizeObserver polyfill](https://github.com/que-etc/resize-observer-polyfill)
  - Copyright (c) 2016 Denis Rul
  
## Special thanks to
- [stackoverflow](https://stackoverflow.com)
  - So many helpful answers, too many to credit them individually. Kudos to this awesome community!
  
- [Nickelartist](http://nickelartist.com/)
  - For many inspirations and some awesome presets.
