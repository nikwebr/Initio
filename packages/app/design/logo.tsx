import { Image } from 'app/design/image'
import imgSrc from 'app/design/assets/Initio.png'
import { MotiView } from 'moti'

type LogoProps = {
    doAnimate?: boolean
    className?: string
}

function logo(classNames?: string) {
    return (
        <Image
            src={imgSrc}
            height={100}
            alt="Some cool logo of Initio"
            className={'h-25 w-40 ' + (classNames ? classNames : '')}
        />
    )
}

export function Logo(props: LogoProps) {
    if (props.doAnimate) {
        return (
            <MotiView
                from={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    // default settings for all style values
                    type: 'timing',
                    duration: 350,
                    // set a custom transition for scale
                    scale: {
                        type: 'spring',
                        delay: 100,
                    },
                }}
            >
                {logo(props.className)}
            </MotiView>
        )
    }
    return logo(props.className)
}
