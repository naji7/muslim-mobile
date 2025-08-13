import React from 'react';
import Svg, { Defs, Pattern, Rect, Path } from 'react-native-svg';

export const PatternBackground: React.FC<{ opacity?: number }>
= ({ opacity = 0.06 }) => {
	return (
		<Svg pointerEvents="none" style={{ position: 'absolute', inset: 0 }} width="100%" height="100%" viewBox="0 0 400 400">
			<Defs>
				<Pattern id="islamic" patternUnits="userSpaceOnUse" width="80" height="80">
					<Path d="M40 0 L50 10 L40 20 L30 10 Z" fill="#16a34a" />
					<Path d="M0 40 L10 50 L0 60 L-10 50 Z" fill="#16a34a" />
					<Path d="M80 40 L90 50 L80 60 L70 50 Z" fill="#16a34a" />
					<Path d="M40 80 L50 90 L40 100 L30 90 Z" fill="#16a34a" />
					<Path d="M40 40 m-14,0 a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0" fill="none" stroke="#16a34a" strokeWidth="1" />
				</Pattern>
			</Defs>
			<Rect x="0" y="0" width="100%" height="100%" fill="url(#islamic)" opacity={opacity} />
		</Svg>
	);
};