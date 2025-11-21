import faiss
import pickle
from pathlib import Path

INDEX_PATH = Path("faiss_index.bin")
META_PATH = Path("meta.pkl")

class FaissIndexer:
    def __init__(self, dim):
        self.dim = dim
        self.index = faiss.IndexFlatL2(dim)
        self.metadata = []

    def add(self, vectors, metas):
        self.index.add(vectors)
        self.metadata.extend(metas)

    def save(self):
        faiss.write_index(self.index, str(INDEX_PATH))
        with open(META_PATH, "wb") as f:
            pickle.dump(self.metadata, f)

    def load(self):
        if INDEX_PATH.exists():
            self.index = faiss.read_index(str(INDEX_PATH))
        if META_PATH.exists():
            with open(META_PATH, "rb") as f:
                self.metadata = pickle.load(f)

    def search(self, qvec, k=5):
        # handle empty index safely
        if getattr(self.index, 'ntotal', 0) == 0 or len(self.metadata) == 0:
            return []
        D, I = self.index.search(qvec, k)
        results = []
        seen = set()
        for row in I:
            for idx in row:
                if idx == -1:
                    continue
                if idx in seen:
                    continue
                seen.add(idx)
                # guard against stale indices
                if 0 <= idx < len(self.metadata):
                    results.append(self.metadata[idx])
        return results
