import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
import messages from '@/utils/messages';

const toast = useToast()

export const bookStore = defineStore('bookStore', {
    id: 'bookStore',
    state: () => ({
        books: [],
        book: {}
    }),
    getters: {
        getBooks() {
            return this.books;
        },
        getBook() {
            return this.book;
        }
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
        async create(values) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/subjects`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();
                this.book = data.data;

                this.books.push(this.book);

                toast.success(data.message);
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
        async update(id, values) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/subjects/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();
                this.book = data.data;

                const itemIndex = this.books.findIndex(book => book.id === id);
                this.books[itemIndex] = this.book;

                toast.success(data.message);
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
        async delete(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/subjects/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();

                const itemIndex = this.books.findIndex(book => book.id === id);
                this.books.splice(itemIndex, 1);

                toast.success(data.message);
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
    },
});
