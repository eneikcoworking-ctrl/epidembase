<script lang="ts">
    import { content } from '$lib/data';

    const videoItems = content.filter(item => item.videoUrl);
    let currentIndex = $state(0);

    function next() {
        currentIndex = (currentIndex + 1) % videoItems.length;
    }

    function prev() {
        currentIndex = (currentIndex - 1 + videoItems.length) % videoItems.length;
    }
</script>

{#if videoItems.length > 0}
    <div class="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl mb-12 group">
        <div class="aspect-video md:aspect-[21/9] flex items-center justify-center text-white p-8 md:p-16">
            {#each [videoItems[currentIndex]] as item (item.id)}
                <div class="max-w-3xl text-center">
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-600 text-xs font-bold uppercase mb-4">Видео-инструкция</span>
                    <h2 class="text-2xl md:text-4xl font-bold mb-4">{item.title}</h2>
                    <p class="text-gray-400 text-lg mb-8 line-clamp-2">{item.description}</p>
                    <a href="/content/{item.id}" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Смотреть инструкцию
                    </a>
                </div>
            {/each}
        </div>

        {#if videoItems.length > 1}
            <button
                onclick={prev}
                aria-label="Предыдущее видео"
                class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onclick={next}
                aria-label="Следующее видео"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {#each videoItems as _, i}
                    <button
                        onclick={() => currentIndex = i}
                        aria-label="Перейти к видео {i + 1}"
                        class="w-2 h-2 rounded-full transition-all {currentIndex === i ? 'bg-white w-6' : 'bg-white/30'}"
                    ></button>
                {/each}
            </div>
        {/if}
    </div>
{/if}
