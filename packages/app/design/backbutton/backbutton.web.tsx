import {Text} from "app/design/typography";

import { useRouter } from 'solito/navigation'
import {MotiPressable} from "app/design/button";

export const BackButton = () => {
    const router = useRouter()

    return <MotiPressable onPress={() => router.back()}><Text className="text-base font-semibold">👈 Go back</Text></MotiPressable>
}
