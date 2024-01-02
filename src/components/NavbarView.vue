<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="#">
                Teste Spassu
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" :class="{ 'active': this.$route.path === '/autores' }" to="/autores">
                            Autores
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :class="{ 'active': this.$route.path === '/assuntos' }"
                            to="/assuntos">
                            Assuntos
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :class="{ 'active': this.$route.path === '/livros' }" to="/livros">
                            Livros
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>