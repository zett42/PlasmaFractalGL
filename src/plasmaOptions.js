/*
PlasmaFractal options module. Copyright (c) 2019 zett42.
https://github.com/zett42/plasmafractal-gl

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 
*/

import * as z42opt from './components/optionsDescriptorValues.js'
import z42PaletteOpt from './components/optionsDescriptorPalette.js'

//------------------------------------------------------------------------------------------------
// Ease functions from 'z42ease.js' to use (excluded some which doesn't look good).
// Map to short keys for serializing to URL params.

const paletteEaseFunctions = {
	linear       : { shortKey: "l"     , title: "Linear"                        },
	inQuad       : { shortKey: "i2"    , title: "Quadratic [in]"                },
	outQuad      : { shortKey: "o2"    , title: "Quadratic [out]"               },
	inOutQuad    : { shortKey: "io2"   , title: "Quadratic [in/out]"            },
	inCubic      : { shortKey: "i3"    , title: "Cubic [in]"                    },
	outCubic     : { shortKey: "o3"    , title: "Cubic [out]"                   },
	inOutCubic   : { shortKey: "io3"   , title: "Cubic [in/out]"                },
	inQuart      : { shortKey: "i4"    , title: "Quartic [in]"                  },
	outQuart     : { shortKey: "o4"    , title: "Quartic [out]"                 },
	inOutQuart   : { shortKey: "io4"   , title: "Quartic [in/out]"              },
	inQuint      : { shortKey: "i5"    , title: "Quintic [in]"                  },
	outQuint     : { shortKey: "o5"    , title: "Quintic [out]"                 },
	inOutQuint   : { shortKey: "io5"   , title: "Quintic [in/out]"              },
	inSine       : { shortKey: "is"    , title: "Sine [in]"                     },
	outSine      : { shortKey: "os"    , title: "Sine [out]"                    },
	inOutSine    : { shortKey: "ios"   , title: "Sine [in/out]"                 },
	inOutSine2_3 : { shortKey: "ios23" , title: "Sine(x) + Sine(x*3)  [in/out]" },
	inOutSine2_5 : { shortKey: "ios25" , title: "Sine(x) + Sine(x*5)  [in/out]" },
	inOutSine2_9 : { shortKey: "ios29" , title: "Sine(x) + Sine(x*9)  [in/out]" },
	inOutSine2_13: { shortKey: "ios213", title: "Sine(x) + Sine(x*13) [in/out]" },
	inExpo       : { shortKey: "ie"    , title: "Exponential [in]"              },
	outExpo      : { shortKey: "oe"    , title: "Exponential [out]"             },
	inOutExpo    : { shortKey: "ioe"   , title: "Exponential [in/out]"          },
	inExpo2      : { shortKey: "ie2"   , title: "Double Exponential [in]"       },
	outExpo2     : { shortKey: "oe2"   , title: "Double Exponential [out]"      },
	inOutExpo2   : { shortKey: "ioe2"  , title: "Double Exponential [in/out]"   },
	inCirc       : { shortKey: "ic"    , title: "Circular [in]"                 },
	outCirc      : { shortKey: "oc"    , title: "Circular [out]"                },
	inOutCirc    : { shortKey: "ioc"   , title: "Circular [in/out]"             },
	inBounce     : { shortKey: "ib"    , title: "Bounce [in]"                   },
	outBounce    : { shortKey: "ob"    , title: "Bounce [out]"                  },
	inOutBounce  : { shortKey: "iob"   , title: "Bounce [in/out]"               },
};

const noiseFunctions3D = {
	Perlin3D        : { shortKey: "p3",  title: "Perlin" },
	SimplexPerlin3D : { shortKey: "s3",  title: "Simplex" },
	Value3D         : { shortKey: "v3",  title: "Value" },
	Cellular3D      : { shortKey: "c3",  title: "Cellular" },
};

const warpFunctions = {
	warpRegular       : { shortKey: "r",  title: "Regular",        hasRotationParam: false },
	warpPolar         : { shortKey: "p",  title: "Polar",          hasRotationParam: true  },
	warpVortex        : { shortKey: "v",  title: "Vortex",         hasRotationParam: true  },
	warpVortexInverse : { shortKey: "vi", title: "Vortex Inverse", hasRotationParam: true  },
	warpDerivatives   : { shortKey: "d",  title: "Derivatives",    hasRotationParam: false },
};

//------------------------------------------------------------------------------------------------
// Describes all available options, e. g. default values, constraints, mapping to URL params, etc.
// It does NOT store actual option values!

const optionsDescriptor = new z42opt.Node( {}, {
	noise: new z42opt.Node( {}, {
		noiseFunction: new z42opt.EnumOpt({
			shortKey: "n",
			title: "Noise function",
			values: noiseFunctions3D,
			defaultVal: "Perlin3D",
		}),
		frequency: new z42opt.FloatOpt({ 
			shortKey: "f",
			title: "Frequency",
			min: 0.01,
			max: 15,
			maxDecimals: 2,
			isScale: true,
			scaleNormalPos: 0.33,
			defaultVal: 1.5,
		}),
		octaves: new z42opt.FloatOpt({
			shortKey: "o",
			title: "Octaves",
			min: 1,
			max: 15,
			maxDecimals: 2,
			defaultVal: 10,
		}),
		gain: new z42opt.FloatOpt({
			shortKey: "g",
			title: "Gain",
			min: 0.1,
			max: 1.0,
			maxDecimals: 2,
			defaultVal: 0.5,
			enabled: options => options.noise.octaves > 1,
		}),
		lacunarity: new z42opt.FloatOpt({
			shortKey: "l",
			title: "Lacunarity",
			min: 1,
			max: 10,
			maxDecimals: 2,
			defaultVal: 2,
			enabled: options => options.noise.octaves > 1,
		}),
		angle: new z42opt.FloatOpt({
			shortKey: "an",
			title: "Angle",
			min: 0,
			max: 90,
			maxDecimals: 1,
			defaultVal: 0,
			enabled: options => options.noise.octaves > 1,
		}),
		amplitude: new z42opt.FloatOpt({
			shortKey: "a",
			title: "Amplitude",
			min: 0.1,
			max: 50,
			isScale: true,
			scaleNormalPos: 0.15,
			maxDecimals: 2,
			defaultVal: 1,
		}),
		isClamp: new z42opt.BoolOpt({
			shortKey: "c",
			title: "Clamp",
			defaultVal: false,
		}),
	}),
	warp: new z42opt.Node( {}, {
		isEnabled: new z42opt.BoolOpt({
			shortKey: "de",
			title: "Warp the noise",
			defaultVal: false,
		}),		
		transformFunction: new z42opt.EnumOpt({
			shortKey: "wt",
			title: "Transform function",
			values: warpFunctions,
			defaultVal: "warpVortex",
			depends: options => options.warp.isEnabled,
		}),
		noiseFunction: new z42opt.EnumOpt({
			shortKey: "wn",
			title: "Noise function",
			values: noiseFunctions3D,
			defaultVal: "Perlin3D",
			depends: options => options.warp.isEnabled,
		}),
		frequency: new z42opt.FloatOpt({ 
			shortKey: "wf",
			title: "Frequency",
			min: 0.01,
			max: 15,
			maxDecimals: 2,
			isScale: true,
			scaleNormalPos: 0.33,
			defaultVal: 1.5,
			depends: options => options.warp.isEnabled,
		}),
		octaves: new z42opt.FloatOpt({
			shortKey: "wo",
			title: "Octaves",
			min: 1,
			max: 15,
			maxDecimals: 2,
			defaultVal: 4,
			depends: options => options.warp.isEnabled,
		}),
		gain: new z42opt.FloatOpt({
			shortKey: "wg",
			title: "Gain",
			min: 0.1,
			max: 1.0,
			maxDecimals: 2,
			defaultVal: 0.75,
			enabled: options => options.warp.octaves > 1,
			depends: options => options.warp.isEnabled,
		}),
		lacunarity: new z42opt.FloatOpt({
			shortKey: "wl",
			title: "Lacunarity",
			min: 1,
			max: 10,
			maxDecimals: 2,
			defaultVal: 2,
			enabled: options => options.warp.octaves > 1,
			depends: options => options.warp.isEnabled,
		}),
		amplitude: new z42opt.FloatOpt({
			shortKey: "wa",
			title: "Amplitude",
			min: 1,
			max: 100,
			maxDecimals: 1,
			defaultVal: 12,
			depends: options => options.warp.isEnabled,
		}),
		rotation: new z42opt.FloatOpt({
			shortKey: "wr",
			title: "Rotation",
			min: 1,
			max: 20,
			maxDecimals: 1,
			defaultVal: 4,
			depends: options => options.warp.isEnabled && 
			         warpFunctions[ options.warp.transformFunction ].hasRotationParam
		}),
	}),
	warp2: new z42opt.Node( {}, {
		isEnabled: new z42opt.BoolOpt({
			shortKey: "de2",
			title: "Warp the warp",
			defaultVal: false,
		}),		
		transformFunction: new z42opt.EnumOpt({
			shortKey: "wt2",
			title: "Transform function",
			values: warpFunctions,
			defaultVal: "warpVortex",
			depends: options => options.warp2.isEnabled,
		}),
		noiseFunction: new z42opt.EnumOpt({
			shortKey: "wn2",
			title: "Noise function",
			values: noiseFunctions3D,
			defaultVal: "SimplexPerlin3D",
			depends: options => options.warp2.isEnabled,
		}),
		frequency: new z42opt.FloatOpt({ 
			shortKey: "wf2",
			title: "Frequency",
			min: 0.01,
			max: 15,
			maxDecimals: 2,
			isScale: true,
			scaleNormalPos: 0.33,
			defaultVal: 3.0,
			depends: options => options.warp2.isEnabled,
		}),
		octaves: new z42opt.FloatOpt({
			shortKey: "wo2",
			title: "Octaves",
			min: 1,
			max: 15,
			maxDecimals: 2,
			defaultVal: 4,
			depends: options => options.warp2.isEnabled,
		}),
		gain: new z42opt.FloatOpt({
			shortKey: "wg2",
			title: "Gain",
			min: 0.1,
			max: 1.0,
			maxDecimals: 2,
			defaultVal: 0.55,
			enabled: options => options.warp2.octaves > 1,
			depends: options => options.warp2.isEnabled,
		}),
		lacunarity: new z42opt.FloatOpt({
			shortKey: "wl2",
			title: "Lacunarity",
			min: 1,
			max: 10,
			maxDecimals: 2,
			defaultVal: 2,
			enabled: options => options.warp2.octaves > 1,
			depends: options => options.warp2.isEnabled,
		}),
		amplitude: new z42opt.FloatOpt({
			shortKey: "wa2",
			title: "Amplitude",
			min: 1,
			max: 100,
			maxDecimals: 1,
			defaultVal: 3,
			depends: options => options.warp2.isEnabled,
		}),
		rotation: new z42opt.FloatOpt({
			shortKey: "wr2",
			title: "Rotation",
			min: 1,
			max: 20,
			maxDecimals: 1,
			defaultVal: 2,
			depends: options => options.warp2.isEnabled && 
			         warpFunctions[ options.warp2.transformFunction ].hasRotationParam
		}),
	}),
	feedback: new z42opt.Node( {}, {
		isEnabled: new z42opt.BoolOpt({
			shortKey: "fbe",
			title: "Enable feedback effect",
			defaultVal: false,
		}),
		lockFPS: new z42opt.BoolOpt({
			shortKey: "fblf",
			title: "Lock FPS to 60 to ensure same speed on different devices",
			defaultVal: true,
			depends: options => options.feedback.isEnabled,
		}),
		blending: new z42opt.Node( {}, {
			inputBrightness: new z42opt.FloatOpt({
				shortKey: "fbib",
				title: "Input brightness",
				min: 0,
				max: 1,
				maxDecimals: 3,
				defaultVal: 0.02,
				depends: options => options.feedback.isEnabled,
			}),
			feedbackBrightness: new z42opt.FloatOpt({
				shortKey: "fbb",
				title: "Feedback brightness",
				min: 0,
				max: 1,
				maxDecimals: 3,
				defaultVal: 0.95,
				depends: options => options.feedback.isEnabled,
			}),	
		}),
		warp: new z42opt.Node( {}, {
			isEnabled: new z42opt.BoolOpt({
				shortKey: "fbwe",
				title: "Enable feedback warp",
				defaultVal: false,
				depends: options => options.feedback.isEnabled,
			}),		
			transformFunction: new z42opt.EnumOpt({
				shortKey: "fbt",
				title: "Transform function",
				values: warpFunctions,
				defaultVal: "warpRegular",
				depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled,
			}),
			noiseFunction: new z42opt.EnumOpt({
				shortKey: "fbn",
				title: "Noise function",
				values: noiseFunctions3D,
				defaultVal: "SimplexPerlin3D",
				depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled,
			}),
			frequency: new z42opt.FloatOpt({ 
				shortKey: "fbf",
				title: "Frequency",
				min: 0.01,
				max: 15,
				maxDecimals: 2,
				isScale: true,
				scaleNormalPos: 0.33,
				defaultVal: 3.0,
				depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled,
			}),
			octaves: new z42opt.FloatOpt({
				shortKey: "fbo",
				title: "Octaves",
				min: 1,
				max: 15,
				maxDecimals: 2,
				defaultVal: 4,
				depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled,
			}),
			gain: new z42opt.FloatOpt({
				shortKey: "fbg",
				title: "Gain",
				min: 0.1,
				max: 1.0,
				maxDecimals: 2,
				defaultVal: 0.55,
				enabled: options => options.feedback.warp.octaves > 1,
				depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled,
			}),
			lacunarity: new z42opt.FloatOpt({
				shortKey: "fbl",
				title: "Lacunarity",
				min: 1,
				max: 10,
				maxDecimals: 2,
				defaultVal: 2,
				enabled: options => options.feedback.warp.octaves > 1,
				depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled,
			}),
			amplitude: new z42opt.FloatOpt({
				shortKey: "fba",
				title: "Amplitude",
				min: 0.01,
				max: 100,
				maxDecimals: 2,
				isScale: true,
				scaleNormalPos: 0.33,
				defaultVal: 3,
				depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled,
			}),
			rotation: new z42opt.FloatOpt({
				shortKey: "fbr",
				title: "Rotation",
				min: 1,
				max: 20,
				maxDecimals: 1,
				defaultVal: 2,
				depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled && 
						 warpFunctions[ options.feedback.warp.transformFunction ].hasRotationParam
			}),
		}),
	}),
	palette: new z42opt.Node( {}, {
		isGrayScale: new z42opt.BoolOpt({
			shortKey: "pg",
			title: "Show only grayscale output",
			defaultVal: false,
		}),
		isCustom: new z42opt.BoolOpt({
			shortKey: "icp",
			title: "Custom palette",
			defaultVal: false,
			depends: options => ! options.palette.isGrayScale,
		}),
		easeFunctionBgToFg: new z42opt.EnumOpt({
			shortKey: "pbf",
			title: "Background to foreground easing",
			values: paletteEaseFunctions,
			defaultVal: "inBounce",
			depends: options => ! options.palette.isCustom && ! options.palette.isGrayScale,
		}),
		easeFunctionFgToBg: new z42opt.EnumOpt({
			shortKey: "pfb",
			title: "Foreground to background easing",
			values: paletteEaseFunctions,
			defaultVal: "outBounce",
			depends: options => ! options.palette.isCustom && ! options.palette.isGrayScale,
		}),
		saturation: new z42opt.FloatOpt({
			shortKey: "ps",
			title: "Saturation",
			min: 0,
			max: 1,
			maxDecimals: 2,
			defaultVal: 0.5,
			depends: options => ! options.palette.isCustom && ! options.palette.isGrayScale,
		}),
		brightness: new z42opt.FloatOpt({
			shortKey: "pb",
			title: "Brightness",
			min: 0,
			max: 1,
			maxDecimals: 2,
			defaultVal: 1.0,
			depends: options => ! options.palette.isGrayScale,
		}),
		bgColor: new z42opt.ColorOpt({
			shortKey: "pbg",
			title: "Background color",
			defaultVal: { r: 0, g: 0, b: 0, a: 1 },
			depends: options => ! options.palette.isCustom && ! options.palette.isGrayScale,
		}),
		customPalette: new z42PaletteOpt({
			shortKey: "cp",
			easeFunctions: paletteEaseFunctions,
			defaultEaseFunction: "linear",
			defaultVal: [],
			depends: options => options.palette.isCustom && ! options.palette.isGrayScale,
		}),
		isCustomPaletteAnimated: new z42opt.BoolOpt({
			shortKey: "acp",
			title: "Animate custom palette (random hue offset)",
			defaultVal: false,
			depends: options => options.palette.isCustom && ! options.palette.isGrayScale,
		}),		
	}),
	noiseAnim: new z42opt.Node( {}, {
		isEnabled: new z42opt.BoolOpt({
			shortKey: "inm",
			title: "Mutate noise",
			defaultVal: true,
		}),
		noiseSpeed: new z42opt.FloatOpt({
			shortKey: "ns",
			title: "Noise mutation speed",
			min: 0,
			max: 1,
			maxDecimals: 2,
			isSlow: true,
			defaultVal: 0.05,
			depends: options => options.noiseAnim.isEnabled
		}),
		turbulence: new z42opt.FloatOpt({
			shortKey: "ntu",
			title: "Noise turbulence",
			min: 1.0,
			max: 2.5,
			maxDecimals: 2,
			isSlow: true,
			defaultVal: 1.85,
			depends: options => options.noiseAnim.isEnabled
		}),
	}),
	warpAnim: new z42opt.Node( {}, {
		isEnabled: new z42opt.BoolOpt({
			shortKey: "iwm",
			title: "Mutate warp",
			defaultVal: false,
			depends: options => options.warp.isEnabled 
		}),
		noiseSpeed: new z42opt.FloatOpt({
			shortKey: "ws",
			title: "Warp mutation speed",
			min: 0,
			max: 1,
			maxDecimals: 2,
			isSlow: true,
			defaultVal: 0.05,
			depends: options => options.warp.isEnabled && options.warpAnim.isEnabled 
		}),
		turbulence: new z42opt.FloatOpt({
			shortKey: "wtu",
			title: "Warp turbulence",
			min: 1.0,
			max: 2.5,
			maxDecimals: 2,
			isSlow: true,
			defaultVal: 1.85,
			depends: options => options.warp.isEnabled && options.warpAnim.isEnabled
		}),
	}),
	warpAnim2: new z42opt.Node( {}, {
		isEnabled: new z42opt.BoolOpt({
			shortKey: "iwm2",
			title: "Mutate warp²",
			defaultVal: false,
			depends: options => options.warp2.isEnabled 
		}),
		noiseSpeed: new z42opt.FloatOpt({
			shortKey: "ws2",
			title: "Warp² mutation speed",
			min: 0,
			max: 1,
			maxDecimals: 2,
			isSlow: true,
			defaultVal: 0.05,
			depends: options => options.warp2.isEnabled && options.warpAnim2.isEnabled 
		}),
		turbulence: new z42opt.FloatOpt({
			shortKey: "wtu2",
			title: "Warp² turbulence",
			min: 1.0,
			max: 2.5,
			maxDecimals: 2,
			isSlow: true,
			defaultVal: 1.85,
			depends: options => options.warp2.isEnabled && options.warpAnim2.isEnabled
		}),
	}),
	feedbackAnim: new z42opt.Node( {}, {
		isEnabled: new z42opt.BoolOpt({
			shortKey: "iwmf",
			title: "Mutate feedback warp",
			defaultVal: false,
			depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled
		}),
		noiseSpeed: new z42opt.FloatOpt({
			shortKey: "wsf",
			title: "Feedback warp mutation speed",
			min: 0,
			max: 1,
			maxDecimals: 2,
			isSlow: true,
			defaultVal: 0.05,
			depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled && options.feedbackAnim.isEnabled 
		}),
		turbulence: new z42opt.FloatOpt({
			shortKey: "wtuf",
			title: "Feedback warp turbulence",
			min: 1.0,
			max: 2.5,
			maxDecimals: 2,
			isSlow: true,
			defaultVal: 1.85,
			depends: options => options.feedback.isEnabled && options.feedback.warp.isEnabled && options.feedbackAnim.isEnabled
		}),
	}),
	paletteAnim: new z42opt.Node( {}, {
		isRotaEnabled: new z42opt.BoolOpt({
			shortKey: "ipr",
			title: "Rotate palette (disabled if Noise > Clamp is set)",
			defaultVal: false,
			enabled: options => ! options.noise.isClamp,
		}),		
		rotaSpeed: new z42opt.FloatOpt({
			shortKey: "prs",
			title: "Palette rotation speed",
			min: 0,
			max: 1,
			maxDecimals: 2,
			isSlow: true,
			defaultVal: 0.1,
			depends: options => options.paletteAnim.isRotaEnabled && ! options.noise.isClamp,
		}),
		transitionDelay: new z42opt.DurationOpt({
			shortKey: "ptde",
			title: "Palette transition delay",
			min: 0,
			max: 30,
			displayUnit: "s",
			maxDecimals: 1,
			isSlow: true,
			defaultVal: 10,
			depends: options => ! options.palette.isCustom || options.palette.isCustomPaletteAnimated,
		}),
		transitionDuration: new z42opt.DurationOpt({
			shortKey: "ptd",
			title: "Palette transition duration",
			min: 0.1,
			max: 30,
			displayUnit: "s",
			maxDecimals: 1,
			isSlow: true,
			defaultVal: 5,
			depends: options => ! options.palette.isCustom || options.palette.isCustomPaletteAnimated,
		}),
	}),
	info: new z42opt.Node( {}, {
		showFps: new z42opt.BoolOpt({
			shortKey: "sfp",
			title: "Show FPS",
			defaultVal: false,
			serialize: false,
		}),
	}),
});

//------------------------------------------------------------------------------------------------
// Describes the GUI structure of the options.

const optionsView = {
	title: "PlasmaFractal Options",
	moreInfoLinkUrl: "https://github.com/zett42/plasmafractal-gl",
	moreInfoLinkText: "GitHub Project",
	
	//Group components can be customized, this is the default:
	//component: "z42opt-tabs",

	groups: {
		noiseTab: {
			title: "Noise",
			options: [ "noise" ]
		},
		warpingTab: {
			title: "Warp",
			options: [ "warp" ]
		},
		warpingTab2: {
			title: "Warp²",
			options: [ "warp2" ]
		},
		feedbackTab: {
			title: "Feedback",
			options: [ "feedback" ]
		},
		paletteTab: {
			title: "Palette",
			options: [ "palette" ]
		},
		animTab: {
			title: "Animation",

			// This creates a flat view of the palette and noise anim options:
			options: [ "noiseAnim", "warpAnim", "warpAnim2", "feedbackAnim", "paletteAnim" ],

			/* This would create nested tabs instead:
			groups: {
				paletteAnimGrp: {
					title: "Palette",
					options: [ "paletteAnim" ]
				},
				noiseAnimGrp: {
					title: "Noise",
					options: [ "noiseAnim" ]
				}
			},
			*/
		},
		infoTab: {
			title: "Info",
			options: [ "info" ]
		},
	}
};

//------------------------------------------------------------------------------------------------

export {
	optionsDescriptor,
	optionsView,
}
