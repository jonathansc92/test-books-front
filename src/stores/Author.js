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

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();

                this.authors = data.data;
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
        async show(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/authors/${id}`);

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();

                this.author = data.data;
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
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

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();
                this.author = data.data;

                toast.success(data.message);

                this.router.push('/autores');
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
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

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();
                
                toast.success(data.message);

                this.router.push('/autores');
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
        async delete(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/authors/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();

                const itemIndex = this.authors.findIndex(author => author.id === id);
                this.authors.splice(itemIndex, 1);

                toast.success(data.message);
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
    },
});