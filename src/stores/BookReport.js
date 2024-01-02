import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
import messages from '@/utils/messages';

const toast = useToast()

export const bookReportStore = defineStore('bookReportStore', {
    id: 'bookReportStore',
    actions: {
        async report() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/report`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    },
                });

                if (!response.ok) {
                    toast.error(messages.ERROR);
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'relatorio.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(messages.ERROR);
            }
        },
    },
});
