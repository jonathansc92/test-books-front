import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
import messages from '@/utils/messages';

const toast = useToast()

export const authorStore = defineStore('authorStore', {
    id: 'authorStore',
    state: () => ({
        authors: [],
        author: {},
    }),
    getters: {
        getAuthors() {
            return this.authors;
        },
        getAuthor() {
            return this.author;
        },
    },
    actions: {
        async get() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/authors`);

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    this.authors = data.data;
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async show(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/authors/${id}`);

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    this.author = data.data;
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async create(values) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/authors`, {
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
                    this.author = data.data;
                    toast.success(data.message);

                    this.router.push('/autores');
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async update(id, values) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/authors/${id}`, {
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

                    this.router.push('/autores');
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async delete(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/authors/${id}`, {
                    method: 'DELETE'
                });

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    const itemIndex = this.authors.findIndex(author => author.id === id);
                    this.authors.splice(itemIndex, 1);

                    toast.success(data.message);
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
    },
});