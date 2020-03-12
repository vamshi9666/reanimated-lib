import { Component } from "react";
import Animated from "react-native-reanimated";
export declare enum Effect {
    SLIDE_FROM_BOTTOM = 1,
    SLIDE_FROM_TOP = 2
}
interface IProps {
    visible: Boolean;
    callbackNode: Animated.Value<number>;
    fromDirection?: String;
    showModal: Animated.Adaptable<number>;
    effect: Effect;
}
interface IState {
}
declare class ReanimatedModal extends Component<IProps, IState> {
    private modalTranslateY;
    private shadowOpacity;
    private fromCoordinate;
    private toCoordinate;
    private clock;
    constructor(props: IProps);
    render(): JSX.Element;
}
export default ReanimatedModal;
