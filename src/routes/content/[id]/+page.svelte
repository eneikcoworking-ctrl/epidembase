<script lang="ts">
	import { page } from '$app/state';
	import { content } from '$lib/data';

	const id = $derived(page.params.id);
	const item = $derived(content.find((i) => i.id === id));
</script>

<div class="container mx-auto px-4 py-12">
	{#if item}
		<div class="max-w-3xl mx-auto">
			<a href="/" class="text-blue-600 hover:underline mb-8 inline-flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				Назад к списку
			</a>

			<header class="mb-8">
				<div class="flex items-center gap-3 mb-4">
					<span class="px-2 py-1 rounded text-xs font-bold uppercase tracking-wider {item.type === 'article' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}">
						{item.type === 'article' ? 'Статья' : 'Документ'}
					</span>
					<span class="text-gray-500">{item.date}</span>
					<span class="text-gray-300">|</span>
					<span class="text-gray-500">{item.category}</span>
				</div>
				<h1 class="text-4xl font-bold text-gray-900 mb-4">{item.title}</h1>
				<p class="text-xl text-gray-600 italic border-l-4 border-blue-200 pl-4 py-2 bg-blue-50/50">
					{item.description}
				</p>
			</header>

			<div class="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100">
				{@html item.content}
			</div>

			<div class="mt-12 pt-8 border-t border-gray-200 text-center">
				<p class="text-gray-500 mb-4">У вас остались вопросы по этому материалу?</p>
				<button class="btn btn-primary">Связаться с администратором</button>
			</div>
		</div>
	{:else}
		<div class="text-center py-20">
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Материал не найден</h1>
			<p class="text-gray-600 mb-8">К сожалению, запрашиваемая страница не существует.</p>
			<a href="/" class="btn btn-primary">Вернуться на главную</a>
		</div>
	{/if}
</div>

<style>
	@reference "tailwindcss";

	/* Basic prose styles if not using tailwind typography plugin */
	:global(.prose h2) {
		@apply text-2xl font-bold mt-8 mb-4 text-gray-900;
	}
	:global(.prose h3) {
		@apply text-xl font-bold mt-6 mb-3 text-gray-800;
	}
	:global(.prose p) {
		@apply mb-4 leading-relaxed text-gray-700;
	}
</style>
