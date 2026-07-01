<script lang="ts">
	import { content } from '$lib/data';

	let searchQuery = $state('');
	let selectedType = $state('all');

	const filteredContent = $derived(
		content.filter((item) => {
			const matchesSearch =
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesType = selectedType === 'all' || item.type === selectedType;
			return matchesSearch && matchesType;
		})
	);
</script>

<div class="bg-blue-600 text-white py-20">
	<div class="container mx-auto px-4 text-center">
		<h1 class="text-4xl md:text-5xl font-bold mb-4">Добро пожаловать в Базу Знаний</h1>
		<p class="text-xl text-blue-100 max-w-2xl mx-auto">
			Все необходимые инструкции, регламенты и полезные статьи в одном месте.
		</p>
	</div>
</div>

<div id="content" class="container mx-auto px-4 py-12">
	<div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
		<div class="flex-grow max-w-md">
			<label for="search" class="block text-sm font-medium text-gray-700 mb-1">Поиск по названию</label>
			<input
				type="text"
				id="search"
				bind:value={searchQuery}
				placeholder="Например: Устав..."
				class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
			/>
		</div>

		<div>
			<label for="type" class="block text-sm font-medium text-gray-700 mb-1">Тип материала</label>
			<select
				id="type"
				bind:value={selectedType}
				class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
			>
				<option value="all">Все материалы</option>
				<option value="article">Статьи</option>
				<option value="document">Нормативные документы</option>
			</select>
		</div>
	</div>

	{#if filteredContent.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredContent as item}
				<a href="/content/{item.id}" class="card flex flex-col h-full">
					<div class="flex items-center gap-2 mb-3">
						<span class="px-2 py-1 rounded text-xs font-bold uppercase tracking-wider {item.type === 'article' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}">
							{item.type === 'article' ? 'Статья' : 'Документ'}
						</span>
						<span class="text-sm text-gray-400">{item.date}</span>
					</div>
					<h2 class="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
						{item.title}
					</h2>
					<p class="text-gray-600 mb-4 flex-grow">
						{item.description}
					</p>
					<div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
						<span class="text-sm font-medium text-gray-500">{item.category}</span>
						<span class="text-blue-600 font-medium inline-flex items-center">
							Читать далее
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9 5l7 7-7 7" />
							</svg>
						</span>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<div class="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
			<p class="text-gray-500 text-lg">По вашему запросу ничего не найдено.</p>
			<button onclick={() => { searchQuery = ''; selectedType = 'all'; }} class="text-blue-600 mt-2 font-medium hover:underline">
				Сбросить фильтры
			</button>
		</div>
	{/if}
</div>
