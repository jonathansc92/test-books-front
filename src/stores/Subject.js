import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
import messages from '@/utils/messages';

const toast = useToast()

export const subjectStore = defineStore('subjectStore', {
    id: 'subjectStore',
    state: () => ({
        subjects: []
    }),
    getters: {
        getSubjects() {
            return this.subjects;
        },
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
    },
});
