export function ResearchSection() {
  return (
    <section id="research" className="research-section" aria-labelledby="research-title"><div className="shell research-grid">
      <div data-reveal><p className="eyebrow"><span>05 /</span> Beyond the interface</p><h2 id="research-title">Ask better questions.<br /><span className="serif">Test the answers.</span></h2><p className="research-copy">My research explores how sentiment and emotion features affect transformer-based fake news detection. I co-authored a preprint comparing RoBERTa, ELECTRA, BERT, and DistilBERT on the LIAR short-claim dataset.</p><p className="research-note mono">Preprint submitted to Elsevier · Publication pending</p><a className="text-link" href="/resumes/danyal-ai-ml.pdf" target="_blank" rel="noopener noreferrer">Read my AI / ML résumé <span aria-hidden="true">↗</span></a></div>
      <div className="research-result" data-reveal><div className="result-top mono"><span>Selected experiment</span><span>LIAR / ELECTRA</span></div><span className="result-value">72.03<span>%</span></span><p>Accuracy with text + sentiment + emotion</p><div className="result-metrics"><span><strong>0.7626</strong>F1 score</span><span><strong>0.4247</strong>MCC</span></div><p className="result-footnote">Selected combined-feature setting. Results documented in my AI/ML résumé.</p></div>
    </div></section>
  );
}
