/**
 * Generates a 3D multi-layer neural network / AI architecture topology
 * with input nodes, latent graph clusters, attention manifolds, and output bridges.
 */

export function generateNeuralMeshPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  let pIdx = 0;

  // We define major layer hubs
  const layers = [
    { x: -3.0, nodes: 6, spreadY: 2.2, label: 'Ingest' },
    { x: -1.5, nodes: 10, spreadY: 2.8, label: 'Embedding' },
    { x: 0.0, nodes: 14, spreadY: 3.2, label: 'Attention' },
    { x: 1.5, nodes: 8, spreadY: 2.6, label: 'Reasoning' },
    { x: 3.0, nodes: 4, spreadY: 1.8, label: 'Synthesis' },
  ];

  // Pre-generate node centers
  const nodeCenters: { x: number; y: number; z: number }[] = [];
  layers.forEach((layer) => {
    for (let i = 0; i < layer.nodes; i++) {
      const t = (i / (layer.nodes - 1 || 1) - 0.5) * layer.spreadY;
      const z = Math.sin(t * 3.0) * 0.6;
      nodeCenters.push({
        x: layer.x,
        y: t,
        z: z,
      });
    }
  });

  const nodeClusterCount = Math.floor(count * 0.45);
  const synapseCount = Math.floor(count * 0.45);
  const ambientHaloCount = count - nodeClusterCount - synapseCount;

  // 1. Concentrated spheres around neural nodes
  for (let i = 0; i < nodeClusterCount; i++) {
    const node = nodeCenters[i % nodeCenters.length];
    const r = 0.08 + Math.random() * 0.28;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;

    positions[pIdx++] = node.x + Math.cos(theta) * Math.cos(phi) * r;
    positions[pIdx++] = node.y + Math.sin(phi) * r;
    positions[pIdx++] = node.z + Math.sin(theta) * Math.cos(phi) * r;
  }

  // 2. Synaptic connections between adjacent layers
  for (let i = 0; i < synapseCount; i++) {
    const nodeA = nodeCenters[Math.floor(Math.random() * nodeCenters.length)];
    // Find a node in an adjacent or nearby layer
    const candidates = nodeCenters.filter(
      (n) => Math.abs(n.x - nodeA.x) > 0.5 && Math.abs(n.x - nodeA.x) < 2.0
    );
    const nodeB = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : nodeCenters[0];

    // Point along connection line
    const t = Math.random();
    const jitter = 0.06;
    positions[pIdx++] = nodeA.x + (nodeB.x - nodeA.x) * t + (Math.random() - 0.5) * jitter;
    positions[pIdx++] = nodeA.y + (nodeB.y - nodeA.y) * t + (Math.random() - 0.5) * jitter;
    positions[pIdx++] = nodeA.z + (nodeB.z - nodeA.z) * t + (Math.random() - 0.5) * jitter;
  }

  // 3. Ambient data packets orbiting the topology
  for (let i = 0; i < ambientHaloCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const rad = 2.0 + Math.random() * 2.5;
    const h = (Math.random() - 0.5) * 3.5;

    positions[pIdx++] = Math.cos(angle) * rad;
    positions[pIdx++] = h;
    positions[pIdx++] = Math.sin(angle) * (rad * 0.5);
  }

  return positions;
}
