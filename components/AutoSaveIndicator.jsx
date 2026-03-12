export default function AutoSaveIndicator({ status }) {
  if (status === 'idle') return null

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-all animate-fade-in ${
      status === 'saving' ? 'bg-yellow-100 text-yellow-800' :
      status === 'saved' ? 'bg-green-100 text-green-800' :
      status === 'error' ? 'bg-red-100 text-red-800' : ''
    }`}>
      {status === 'saving' && '💾 Salvando...'}
      {status === 'saved' && '✅ Salvo'}
      {status === 'error' && '❌ Erro ao salvar'}
    </div>
  )
}
