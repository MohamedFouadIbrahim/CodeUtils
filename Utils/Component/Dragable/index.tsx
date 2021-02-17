import React, { useState } from 'react';
import {
    Animated,
    PanResponder,
    ViewProps
} from 'react-native';


interface IProps extends ViewProps {

}

const Dragaable: React.FC<IProps> = (props) => {

    const pan = useState(new Animated.ValueXY())[0]

    const panResponder = useState(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),

            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                pan.flattenOffset();
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            }
        })
    )[0]


    return (
        <Animated.View
            style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
            {...panResponder.panHandlers}
        >
            {
                props.children
            }
        </Animated.View>

    );
};

export default Dragaable;
