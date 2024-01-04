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

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    this.books = data.data;
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async show(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${id}`);

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    this.book = data.data;
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async create(values) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    this.book = data.data;
                    toast.success(data.message);

                    this.router.push('/livros');
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async update(id, values) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    toast.success(data.message);

                    this.router.push('/livros');
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async delete(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${id}`, {
                    method: 'DELETE'
                });

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    const itemIndex = this.books.findIndex(book => book.id === id);
                    this.books.splice(itemIndex, 1);

                    toast.success(data.message);
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
    },
});
