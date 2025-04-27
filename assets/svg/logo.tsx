
import React from 'react';
import Svg, { Pattern, Use, Rect, Defs } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

const Logo = () => (
    <View style={styles.container}>
        <Svg width="147" height="137" viewBox="0 0 147 137" fill="none">
            <Rect x="-33" width="180" height="136.337" fill="url(#pattern0_104_286)" />
            <Defs>
                <Pattern id="pattern0_104_286" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <Use transform="matrix(0.00163238 0 0 0.00215517 -0.0843932 0)" />
                </Pattern>
            </Defs>
        </Svg>

    </View>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0
    },
});

export default Logo;
