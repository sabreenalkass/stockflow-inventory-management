function StatsCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">

      <div>
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="text-3xl font-bold text-slate-800 mt-2">
          {value}
        </h3>
      </div>


      <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
        <Icon size={28} />
      </div>

    </div>
  )
}

export default StatsCard