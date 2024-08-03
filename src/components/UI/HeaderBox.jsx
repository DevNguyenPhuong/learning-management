function HeaderBox({ type = "title", title, subtext, user }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-lg lg:text-2xl font-semibold ">
        {title}
        {type === "greeting" && (
          <span className="text-blue-600">&nbsp;{user}</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
}

export default HeaderBox;
