<script lang="ts">
	import { page } from '$app/state';
	import { content } from '$lib/data';

	const id = $derived(page.params.id);
	const item = $derived(content.find((i) => i.id === id));

	let isTeleprompterOpen = $state(false);

	function toggleTeleprompter() {
		isTeleprompterOpen = !isTeleprompterOpen;
	}

	let copySuccess = $state(false);
	function copyLink() {
		navigator.clipboard.writeText(window.location.href).then(() => {
			copySuccess = true;
			setTimeout(() => (copySuccess = false), 2000);
		});
	}

	function printContent() {
		window.print();
	}
</script>

<div class="container mx-auto px-4 py-8 md:py-12 print:p-0">
	{#if item}
		<div class="max-w-4xl mx-auto">
			<nav class="flex mb-8 text-sm font-medium" aria-label="Breadcrumb">
				<ol class="inline-flex items-center space-x-1 md:space-x-2">
					<li class="inline-flex items-center">
						<a href="/" class="text-blue-600 hover:text-blue-800 inline-flex items-center transition-colors">
							<svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
							</svg>
							Главная
						</a>
					</li>
					<li>
						<div class="flex items-center">
							<svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
							</svg>
							<span class="ml-1 text-gray-500 md:ml-2">{item.category}</span>
						</div>
					</li>
					<li aria-current="page">
						<div class="flex items-center">
							<svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
							</svg>
							<span class="ml-1 text-gray-400 md:ml-2 truncate max-w-[100px] md:max-w-xs">{item.title}</span>
						</div>
					</li>
				</ol>
			</nav>

			<header class="mb-8 print:mb-4">
				<div class="flex flex-wrap items-center gap-3 mb-4">
					<span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider {item.type === 'article' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}">
						{item.type === 'article' ? 'Статья' : 'Документ'}
					</span>

					{#if item.status === 'archive'}
						<span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">Архив</span>
					{:else if item.status === 'project'}
						<span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-700">Проект</span>
					{:else}
						<span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">Актуально</span>
					{/if}

					<span class="text-gray-400 text-xs font-medium">Версия: {item.version}</span>
					<span class="text-gray-300">|</span>
					<span class="text-gray-500 text-xs">{item.category}</span>
				</div>

				<div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
					<h1 class="text-3xl md:text-4xl font-bold text-gray-900">{item.title}</h1>
					<div class="flex items-center gap-2 shrink-0 print:hidden">
						<button
							onclick={copyLink}
							class="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 text-sm font-medium"
							title="Копировать ссылку"
						>
							{#if copySuccess}
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span class="text-green-600">Скопировано</span>
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
								</svg>
								<span>Копировать</span>
							{/if}
						</button>
						<button
							onclick={printContent}
							class="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 text-sm font-medium"
							title="Печать"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
							</svg>
							<span>Печать</span>
						</button>
					</div>
				</div>

				<p class="text-lg text-gray-600 italic border-l-4 border-blue-200 pl-4 py-2 bg-blue-50/50 mb-6">
					{item.description}
				</p>

				<div class="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm print:shadow-none print:border-gray-200">
					<div class="flex-grow space-y-3">
						<div class="flex items-center gap-2 text-sm text-gray-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
							<span>Ответственный: <span class="font-medium text-gray-900">{item.responsible}</span></span>
						</div>
						<div class="flex items-center gap-2 text-sm text-gray-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<span>Обновлено: <span class="font-medium text-gray-900">{item.date}</span></span>
						</div>
						{#if item.program}
							<div class="flex items-center gap-2 text-sm text-gray-500">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
								</svg>
								<span>Направление: <span class="font-medium text-gray-900 uppercase">{item.program === 'both' ? 'Ординатура / Аспирантура' : item.program}</span></span>
							</div>
						{/if}
					</div>

					{#if item.fileUrl}
						<div class="flex items-center print:hidden">
							<a
								href={item.fileUrl}
								target="_blank"
								rel="noopener noreferrer"
								download
								class="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-100 group w-full md:w-auto"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
								</svg>
								Открыть / Скачать PDF
							</a>
						</div>
					{/if}
				</div>
			</header>

			{#if item.videoUrl}
				<div class="mb-12 print:hidden">
					<h2 class="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Видео-инструкция
					</h2>
					<div class="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg mb-4 flex items-center justify-center text-white border-4 border-gray-800">
						<div class="text-center">
							<p class="mb-2 opacity-50">Плеер для: {item.videoUrl}</p>
							<p class="text-sm">Имитация воспроизведения видео</p>
						</div>
					</div>

					{#if item.teleprompterText}
						<div class="flex justify-end">
							<button
								onclick={toggleTeleprompter}
								class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								{isTeleprompterOpen ? 'Скрыть текст суфлера' : 'Открыть текст суфлера'}
							</button>
						</div>

						{#if isTeleprompterOpen}
							<div class="mt-4 p-6 bg-gray-900 text-green-400 rounded-xl font-mono text-lg leading-relaxed border-l-8 border-green-600 shadow-inner max-h-60 overflow-y-auto">
								{item.teleprompterText}
							</div>
						{/if}
					{/if}
				</div>
			{/if}

			<div class="prose prose-blue max-w-none bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0">
				{@html item.content}
			</div>

			{#if item.tags.length > 0}
				<div class="mt-8 flex flex-wrap gap-2 print:hidden">
					{#each item.tags as tag}
						<span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">#{tag}</span>
					{/each}
				</div>
			{/if}

			<div class="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
				<div class="text-center md:text-left">
					<p class="text-gray-900 font-bold mb-1">У вас остались вопросы?</p>
					<p class="text-gray-500 text-sm">Свяжитесь с ответственным лицом для уточнения информации.</p>
				</div>
				<button class="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
					Задать вопрос
				</button>
			</div>
		</div>
	{:else}
		<div class="text-center py-20">
			<div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-4">Материал не найден</h1>
			<p class="text-gray-600 mb-8">К сожалению, запрашиваемая страница не существует или была удалена.</p>
			<a href="/" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
				Вернуться на главную
			</a>
		</div>
	{/if}
</div>

<style>
	@reference "tailwindcss";

	/* Basic prose styles */
	:global(.prose h2) {
		@apply text-2xl font-bold mt-8 mb-4 text-gray-900 border-b pb-2;
	}
	:global(.prose h3) {
		@apply text-xl font-bold mt-6 mb-3 text-gray-800;
	}
	:global(.prose p) {
		@apply mb-4 leading-relaxed text-gray-700;
	}
	:global(.prose ul) {
		@apply list-disc pl-6 mb-4 space-y-2 text-gray-700;
	}
</style>
