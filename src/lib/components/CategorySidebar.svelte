<script lang="ts">
    import { content } from '$lib/data';

    interface Props {
        selectedCategory: string;
        onSelect: (category: string) => void;
    }

    let { selectedCategory, onSelect }: Props = $props();

    const categories = [
        'Все разделы',
        'Нормативная база',
        'Приём и движение контингента',
        'Аттестации и экзамены',
        'Стипендии и материальная поддержка',
        'Учёт результатов и хранение документов',
        'Образовательный процесс и практика',
        'Платные образовательные услуги',
        'Управление и кадры',
        'Справочная информация'
    ];

    // Helper to count items in each category
    const getCount = (cat: string) => {
        if (cat === 'Все разделы') return content.length;
        return content.filter(item => item.category === cat).length;
    };
</script>

<nav class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="p-4 bg-gray-50 border-b border-gray-100">
        <h2 class="font-bold text-gray-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Классификатор
        </h2>
    </div>
    <ul class="py-2">
        {#each categories as category}
            <li>
                <button
                    onclick={() => onSelect(category)}
                    class="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between group
                    {selectedCategory === category ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}"
                >
                    <span class="truncate">{category}</span>
                    <span class="text-xs px-2 py-0.5 rounded-full {selectedCategory === category ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}">
                        {getCount(category)}
                    </span>
                </button>
            </li>
        {/each}
    </ul>
</nav>
