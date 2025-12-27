const CateogoryBanner = ({ title }: { title: string }) => {
  return (
    <section className="mb-8 md:mb-10 lg:mb-12">
      <div className="container">
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1619166719123-471cee9ce91e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
          className="relative z-1 flex h-75 flex-col justify-end overflow-hidden rounded-3xl bg-cover p-6 pb-10 after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(181deg,rgba(36,85,80,0.00)_28.43%,rgba(23,54,51,0.40)_76.66%)] md:h-115 md:rounded-4xl lg:h-140 lg:rounded-[58px]"
        >
          <div className="grid gap-2">
            <h1 className="text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
              {title}
            </h1>
            <span className="text-black-5 text-lg">115 Items</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateogoryBanner;
