import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
import messages from '@/utils/messages';

const toast = useToast()

export const bookReportStore = defineStore('bookReportStore', {
    id: 'bookReportStore',
    state: () => ({
        booksReport: [],
        filter: null
    }),
    getters: {
        getBooksReport() {
            return this.booksReport;
        },
        getFilter() {
            return this.filter;
        }
    },
    actions: {
        setFilter(filter) {
            this.filter = filter;
        },
        async report() {
            let apiUrl = this.filter ? `${import.meta.env.VITE_API_URL}/reports/books/export?${this.filter}` : `${import.meta.env.VITE_API_URL}/reports/books/export`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    },
                });

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    const blob = await response.blob();

                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement('a');

                    link.href = url;

                    link.setAttribute('download', `relatorio_livros_${new Date().getTime()}.xlsx`);

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async get() {
            let apiUrl = this.filter ? `${import.meta.env.VITE_API_URL}/reports/books?${this.filter}` : `${import.meta.env.VITE_API_URL}/reports/books`;

            try {
                const response = await fetch(apiUrl);

                const data = await response.json();

                if (!response.ok) {
                    toast.warning(data.message ? data.message : messages.ERROR);
                } else {
                    this.booksReport = data.data;
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
    },
});
