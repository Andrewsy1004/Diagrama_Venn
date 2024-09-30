


import { Navbar, Footer, Introduction, SetTheoryOverview, VennChartApp } from './components'


export const App = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">

      <Navbar />

      <main className="flex-1">
        <Introduction />

        <div className="mt-20">
          <SetTheoryOverview />
        </div>
        
        <VennChartApp />

      </main>



      <Footer />
    </div>
  )
}
