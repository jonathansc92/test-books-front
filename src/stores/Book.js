import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
import messages from '@/utils/messages';

const toast = useToast()

export const bookStore = defineStore('bookStore', {
    id: 'bookStore',
    state: () => ({
        books: []
    }),
    getters: {
        getBooks() {
            return this.books;
        },
    },
    actions: {
        async get() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/books`);

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();

                this.books = data.data;
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
    },
});
