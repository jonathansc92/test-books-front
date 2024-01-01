import { defineStore } from 'pinia';
import { stepDataStore } from './StepData';
import { stepStore } from "@/stores/Step";
import { useToast } from "vue-toastification";
import messages from '@/utils/messages';

const toast = useToast()

export const registrationStore = defineStore('registrationStore', {
    id: 'registrationStore',
    state: () => ({}),
    getters: {},
    actions: {
        async registration(data) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/registration`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const responseData = await response.json();

                stepDataStore().resetStepsData();
                stepStore().setCurrent(0);

                toast.success(responseData.message);
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
    },
});
