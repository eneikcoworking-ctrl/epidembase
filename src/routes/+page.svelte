<script lang="ts">
	import { content } from '$lib/data';
	import CategorySidebar from '$lib/components/CategorySidebar.svelte';
	import VideoSlider from '$lib/components/VideoSlider.svelte';

	let searchQuery = $state('');
	let selectedType = $state('all');
	let selectedCategory = $state('Все разделы');
	let selectedStatus = $state('all');
	let selectedProgram = $state('all');
	let selectedYear = $state('all');

	const years = [...new Set(content.map((item) => item.year).filter(Boolean))].sort().reverse();

	const filteredContent = $derived(
		content.filter((item) => {
			const matchesSearch =
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

			const matchesType = selectedType === 'all' || item.type === selectedType;
			const matchesCategory =
				selectedCategory === 'Все разделы' || item.category === selectedCategory;
			const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
			const matchesProgram =
				selectedProgram === 'all' ||
				item.program === 'both' ||
				item.program === selectedProgram;
			const matchesYear = selectedYear === 'all' || item.year === selectedYear;

			return (
				matchesSearch &&
				matchesType &&
				matchesCategory &&
				matchesStatus &&
				matchesProgram &&
				matchesYear
			);
		})
	);

	function resetFilters() {
		searchQuery = '';
		selectedType = 'all';
		selectedCategory = 'Все разделы';
		selectedStatus = 'all';
		selectedProgram = 'all';
		selectedYear = 'all';
	}
</script>

<div class="bg-blue-600 text-white py-12 md:py-20 mb-8 md:mb-12">
	<div class="container mx-auto px-4 text-center">
		<h1 class="text-3xl md:text-5xl font-bold mb-4">База знаний ЦНИИ Эпидемиологии</h1>
		<p class="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
			Централизованное хранилище нормативных актов, учебных материалов и инструкций образовательного
			центра.
		</p>
	</div>
</div>

<div class="container mx-auto px-4 pb-20">
	<VideoSlider />

	<div class="flex flex-col lg:flex-row gap-8">
		<!-- Sidebar -->
		<aside class="w-full lg:w-64 flex-shrink-0">
			<CategorySidebar
				{selectedCategory}
				onSelect={(cat) => (selectedCategory = cat)}
			/>
		</aside>

		<!-- Main Content -->
		<main class="flex-grow">
			<!-- Filters -->
			<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
					<div class="md:col-span-2 lg:col-span-3">
						<label for="search" class="block text-sm font-medium text-gray-700 mb-1"
							>Поиск по названию или тегам</label
						>
						<div class="relative">
							<input
								type="text"
								id="search"
								bind:value={searchQuery}
								placeholder="Например: ФГОС, ГИА, Стипендия..."
								class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					</div>

					<div>
						<label for="type" class="block text-sm font-medium text-gray-700 mb-1"
							>Тип материала</label
						>
						<select
							id="type"
							bind:value={selectedType}
							class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all text-sm"
						>
							<option value="all">Все типы</option>
							<option value="article">Статьи</option>
							<option value="document">Документы</option>
						</select>
					</div>

					<div>
						<label for="status" class="block text-sm font-medium text-gray-700 mb-1">Статус</label>
						<select
							id="status"
							bind:value={selectedStatus}
							class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all text-sm"
						>
							<option value="all">Все статусы</option>
							<option value="active">Актуальный</option>
							<option value="project">Проект</option>
							<option value="archive">Архив</option>
						</select>
					</div>

					<div>
						<label for="program" class="block text-sm font-medium text-gray-700 mb-1"
							>Направление</label
						>
						<select
							id="program"
							bind:value={selectedProgram}
							class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all text-sm"
						>
							<option value="all">Все направления</option>
							<option value="ordinatura">Ординатура</option>
							<option value="aspirantura">Аспирантура</option>
						</select>
					</div>

					{#if years.length > 0}
						<div>
							<label for="year" class="block text-sm font-medium text-gray-700 mb-1">Год</label>
							<select
								id="year"
								bind:value={selectedYear}
								class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all text-sm"
							>
								<option value="all">Любой год</option>
								{#each years as year}
									<option value={year}>{year}</option>
								{/each}
							</select>
						</div>
					{/if}
				</div>

				<div class="flex items-center justify-between pt-4 border-t border-gray-100">
					<p class="text-sm text-gray-500">
						Найдено материалов: <span class="font-bold text-gray-900">{filteredContent.length}</span
						>
					</p>
					<button onclick={resetFilters} class="text-sm text-blue-600 font-medium hover:underline">
						Сбросить все фильтры
					</button>
				</div>
			</div>

			<!-- Grid -->
			{#if filteredContent.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each filteredContent as item (item.id)}
						<a
							href="/content/{item.id}"
							class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-5 flex flex-col h-full group"
						>
							<div class="flex items-start justify-between mb-4">
								<div class="flex flex-wrap gap-2">
									<span
										class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider {item.type ===
										'article'
											? 'bg-green-100 text-green-700'
											: 'bg-orange-100 text-orange-700'}"
									>
										{item.type === 'article' ? 'Статья' : 'Документ'}
									</span>
									{#if item.fileUrl}
										<span class="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
											</svg>
											PDF
										</span>
									{/if}
									{#if item.status === 'archive'}
										<span
											class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600"
											>Архив</span
										>
									{:else if item.status === 'project'}
										<span
											class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-700"
											>Проект</span
										>
									{/if}
								</div>
								<span class="text-xs text-gray-400 font-medium">v{item.version}</span>
							</div>

							<h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
								{item.title}
							</h3>

							<p class="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
								{item.description}
							</p>

							<div class="flex flex-wrap gap-1 mb-4">
								{#each item.tags.slice(0, 3) as tag}
									<span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">#{tag}</span>
								{/each}
								{#if item.tags.length > 3}
									<span class="text-[10px] text-gray-400">+{item.tags.length - 3}</span>
								{/if}
							</div>

							<div class="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
								<div class="flex items-center gap-2">
									<div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
										{item.responsible.split(' ')[0][0]}
									</div>
									<span class="text-xs text-gray-500">{item.responsible}</span>
								</div>
								<span class="text-xs text-gray-400">{item.date}</span>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
					<div class="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 class="text-lg font-medium text-gray-900 mb-1">Ничего не найдено</h3>
					<p class="text-gray-500 text-sm mb-4">Попробуйте изменить параметры поиска или сбросить фильтры.</p>
					<button onclick={resetFilters} class="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
						Сбросить фильтры
					</button>
				</div>
			{/if}
		</main>
	</div>
</div>
