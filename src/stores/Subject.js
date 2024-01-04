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

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    this.subjects = data.data;
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async show(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/subjects/${id}`);

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    this.subject = data.data;
                }
            } catch (error) {
                console.error('Error submitting data:', error);
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

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    this.subject = data.data;
                    toast.success(data.message);

                    this.router.push('/assuntos');
                }
            } catch (error) {
                console.error('Error submitting data:', error);
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

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    toast.success(data.message);

                    this.router.push('/assuntos');
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async delete(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/subjects/${id}`, {
                    method: 'DELETE'
                });

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    const itemIndex = this.subjects.findIndex(subject => subject.id === id);
                    this.subjects.splice(itemIndex, 1);

                    toast.success(data.message);
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
    },
});
