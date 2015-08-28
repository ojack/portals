/**
 * 
* by Olivia Jack
 * 
 * based on: 
 * Dot screen shader by alteredq / http://alteredqualia.com/
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

THREE.DotDifferenceShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"tDiffuse2": { type: "t", value: null },
		"tSize":    { type: "v2", value: new THREE.Vector2( 256, 256 ) },
		"center":   { type: "v2", value: new THREE.Vector2( 0.5, 0.5 ) },
		"angle":    { type: "f", value: 1.57 },
		"scale":    { type: "f", value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform vec2 center;",
		"uniform float angle;",
		"uniform float scale;",
		"uniform vec2 tSize;",

		"uniform sampler2D tDiffuse;",
		"uniform sampler2D tDiffuse2;",

		"varying vec2 vUv;",

		"float pattern() {",

			"float s = sin( angle ), c = cos( angle );",

			"vec2 tex = vUv * tSize - center;",
			"vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;",

			"return ( sin( point.x ) * sin( point.y ) ) * 4.0;",

		"}",

		"void main() {",

			"vec4 color = texture2D( tDiffuse, vUv );",

			"vec4 texel2 = texture2D( tDiffuse2, vUv );",

			"float average = ( color.r + color.g + color.b ) / 3.0;",

			"float mixRatio = average * 10.0 - 5.0 + pattern();",

			"gl_FragColor = vec4( vec3( mix( color, texel2, mixRatio ) ), color.a );",

		"}"

	].join("\n")

};
