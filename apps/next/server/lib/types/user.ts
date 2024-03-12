import Check from './check'
import UserProfile from 'app/lib/types/userProfile'

export default interface User extends UserProfile {
    emailVerified: boolean
    checks?: Check[]
    friends?: User[]
}
