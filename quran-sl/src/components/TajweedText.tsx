import React from 'react';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

function applyTajweedColorization(text: string) {
	// Very simplistic demo coloring: prolongation symbol (madd ~) and noon/ meem shadda markers.
	return text
		.replace(/~+/g, '<span style="color:#16a34a">~</span>')
		.replace(/ّ/g, '<span style="color:#22c55e">ّ</span>');
}

export const TajweedText: React.FC<{ text: string }>
= ({ text }) => {
	const { width } = useWindowDimensions();
	const html = { html: `<div style="font-size:26px;line-height:44px;direction:rtl;text-align:right">${applyTajweedColorization(text)}</div>` };
	return <RenderHTML contentWidth={width} source={html} />;
};