import type { Check as UserCheck } from 'app/lib/types/check'
export default interface Check extends UserCheck {
    userId: string
}
