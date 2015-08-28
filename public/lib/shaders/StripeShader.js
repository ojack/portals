/**
 *  by Olivia Jack
 * based off of: alteredq / http://alteredqualia.com/
 *
 * Composite two textures based off of blendmode (difference)
 */

THREE.DifferenceShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"tDiffuse2": { type: "t", value: null },
		"stripeWidth":  { type: "f", value: 50 },
		"opacity":   { type: "f", value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float opacity;",
		"uniform float stripeWidth;",

		"uniform sampler2D tDiffuse;",
		"uniform sampler2D tDiffuse2;",

		"varying vec2 vUv;",

		"void main() {",

			"vec4 texel1 = texture2D( tDiffuse, vUv );",
			"vec4 texel2 = texture2D( tDiffuse2, vUv );",
			//"gl_FragColor = opacity * mix( texel1, texel2, mixRatio );",
			"gl_FragColor = vec4(abs(texel1.r - texel2.r), abs(texel1.g - texel2.g), abs(texel1.b - texel2.b), 1.0);",

		"}"

	].join("\n")

};
//vec4(abs(t0.r*diff - t1.r*diffI), abs(t0.g*diff - t1.g*diffI),  abs(t0.b*diff - t1.b*diffI)
