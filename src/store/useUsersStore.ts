import { UserType } from '@/types/User';
import { create } from 'zustand';

interface userStoreProps {
    users: UserType[]
    create: (user: UserType) => void
    setUsers: (users: UserType[]) => void
    update: (user: UserType) => void
    getUserById: (id: string) => UserType | null
}

export const useUsersStore = create<userStoreProps>((set, get) => ({
    users: [],

    create: (user) => set((state) => ({ users: [...state.users, user] })),

    setUsers: (users) =>
        set(() => ({
            users,
        })),

    update: (updatedUser) =>
        set((state) => ({
            users: state.users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user,
            ),
        })),

    getUserById: (id: string) => {
        const state = get()
        const user = state.users.find(
            (user: UserType) => user.id === id
        )
        return user ? user : null
    }
}),

)