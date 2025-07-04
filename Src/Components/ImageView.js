import { Image } from "react-native";

export default function ImageView(props) {
    return (
        <Image
            style={{
                height: props.height,
                width: props.width,
            }}
            source={props.source}
        >
        </Image>
    )
}