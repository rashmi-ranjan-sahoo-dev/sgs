import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * React-safe GSAP context hook.
 * Automates scoping selectors to scopeRef and handles context cleanup on unmount.
 *
 * @param {Function} effect - Callback receiving (context, contextSafe) where GSAP timelines and tweens are declared.
 * @param {React.RefObject | Array} [scope] - Scope reference or dependencies
 * @param {Array} [deps=[]] - Optional dependency array
 */
export function useGsapContext(effect, scope, deps = []) {
  const defaultScopeRef = useRef(null);
  const targetScope = scope || defaultScopeRef;

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      effect(self, ctx.contextSafe ? ctx.contextSafe.bind(ctx) : null);
    }, targetScope.current || undefined);

    return () => ctx.revert();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return targetScope;
}

export default useGsapContext;
