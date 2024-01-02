import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
import messages from '@/utils/messages';

const toast = useToast()

export const subjectStore = defineStore('subjectStore', {
    id: 'subjectStore',
    state: () => ({
        subjects: [],
        subject: {},
    }),
    getters: {
        getSubjects() {
            return this.subjects;
        },
        getSubject() {
            return this.subject;
        }
    },
    actions: {
        async get() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/subjects`);

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();

                this.subjects = data.data;
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
        async show(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/subjects/${id}`);

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const data = await response.json();

                this.subject = data.data;
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

                toast.success(data.message);

                this.router.push('/assuntos');
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

                toast.success(data.message);

                this.router.push('/assuntos');
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

                const itemIndex = this.subjects.findIndex(subject => subject.id === id);
                this.subjects.splice(itemIndex, 1);

                toast.success(data.message);
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
    },
});
