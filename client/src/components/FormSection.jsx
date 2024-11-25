const FormSection = ({ title, subTitle, children }) => {
  return (
    <article>
      <h2 className="text-2xl mt-4">{title}</h2>
      <p className="text-slate-500 text-sm">{subTitle}</p>
      {children}
    </article>
  );
};

export default FormSection;
