# Bert-Based Models Evaluation (10K Benchmark)

This repository contains a practical evaluation workflow for multiple BERT-family models on a 10K-sample fake-news classification benchmark.

It includes:

- dataset split artifacts (`train`, `validation`, `test`)
- model-wise evaluation outputs
- comparison tables for quick analysis
- notebooks used for training/evaluation experiments

## Recommended GitHub Repo Title and About

https://github.com/Danyal-0276/Bert-Based-models-evaluation.git

- **Repository title:** `Bert-Based-models-evaluation`
- **GitHub "About" description:** `Dataset curation and evaluation workflows for BERT-based models using a 10K-sample benchmark.`

## What We Did

The project follows this workflow:

1. Prepared a 10K subset for experimentation from a larger news dataset.
2. Generated train/validation/test splits.
3. Evaluated multiple BERT-based models on the same split setup.
4. Collected model-level metrics into CSV outputs.
5. Built a consolidated comparison table for model performance review.
6. Analyzed source distribution between full data and 10K splits.

## Repository Structure

```text
BERT 10K/
|- 10k train test Val split/
|  |- train.csv
|  |- validation.csv
|  |- test.csv
|  |- split_info.json
|- evaluation_outputs/
|  |- *_model_results.csv
|  |- model_results.csv
|  |- model_comparison_table.csv
|  |- source_distribution_full_vs_10k_splits.csv
|  |- dataset_summary.csv
|  |- dataset_label_eda.csv
|- Bert_Models_Local.ipynb
|- fake_news_10k_multimodel.ipynb
|- .gitignore
|- README.md
```

## Key Files

- `Bert_Models_Local.ipynb`  
  Main notebook for local BERT model experimentation.

- `fake_news_10k_multimodel.ipynb`  
  Multi-model evaluation workflow and experiments.

- `10k train test Val split/split_info.json`  
  Metadata about dataset split strategy/config.

- `evaluation_outputs/model_comparison_table.csv`  
  Consolidated results for comparing model performance.

- `evaluation_outputs/source_distribution_full_vs_10k_splits.csv`  
  Source distribution analysis between full dataset and 10K splits.

## Models Evaluated

From current output files, evaluated models include:

- AdaBERT (literature proxy)
- ConvBERT
- DistilBERT
- FastBERT (literature proxy)
- MobileBERT
- RoBERTa-base
- SciBERT
- StructBERT-large-en
- TinyBERT-4L
- XLM-RoBERTa-base

## How To Use This Repository

## 1) Clone

```bash
git clone https://github.com/Danyal-0276/Bert-Based-models-evaluation.git
cd Bert-Based-models-evaluation
```

## 2) Open notebooks

Open either:

- `Bert_Models_Local.ipynb`
- `fake_news_10k_multimodel.ipynb`

Run cells in order to reproduce data prep/evaluation steps.

## 3) Check outputs

All evaluation summaries are in `evaluation_outputs/`.

Recommended starting files:

- `model_comparison_table.csv`
- `model_results.csv`
- `source_distribution_full_vs_10k_splits.csv`

## Reproducibility Notes

- The repository tracks lightweight evaluation artifacts and split files.
- Large raw dataset files and model checkpoint artifacts are excluded via `.gitignore`.
- To fully reproduce training from scratch, ensure your local environment has the required ML dependencies (PyTorch, Transformers, pandas, scikit-learn, etc.) and sufficient compute resources.

## Suggested Next Improvements

- Add a `requirements.txt` or `environment.yml` for one-command setup.
- Add a script-based pipeline (`src/` + CLI) for non-notebook execution.
- Add per-model config files (batch size, max length, epochs, seed).
- Add confusion matrices and class-wise metrics in output reports.
- Add experiment tracking (e.g., MLflow or Weights & Biases).

## License

Add a license file (`MIT`, `Apache-2.0`, etc.) based on your sharing preference.

## Author

Maintained by the repository owner.
