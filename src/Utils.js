// NEW

export const DIM = 19;
export const B = "black_stone";
export const W = "white_stone";
export const LIBERTY = "liberty";
export const COLORS = [B, W]

export function invert_color(color) {
	if(color === B) return W;
	else return B;
}

export function coord_to_index(coord) {
	return(coord[1]*DIM + coord[0])
}

export function compare_coord(c1, c2) {
	return c1 !== undefined && c1[0] === c2[0] && c1[1] === c2[1];
}

export function move(x,y) {
	return((y-1)*DIM+x-1)
}

export const HOSHI_INDEX = [
	move(4,4), move(10,4), move(16,4),
	move(4,10), move(10,10), move(16,10),
	move(4,16), move(10,16), move(16,16)
]

export function same_positions(p1, p2) {
	let larger = p1;
	if(p2.length > p1.length)
		larger = p2;
	for(let i = 0; i < larger.length; i++) {
		if(p1[i]!==p2[i])
			return false;
	}
	return true
	
}

export function to_human_coord(coord) {

	let [x,y] = coord;

	if(x < 0 || x > 18 || y < 0 || y > 18 ) {
		return "OUT OF BOUNDS";
	}

	var X_AXIS = 'ABCDEFGHJKLMNOPQRST'

	return "" + X_AXIS.charAt(x) + "" + (19-y);

}



// OLD

export const stone_color = [B, W];

export const sample_game = ["pd","dd","pq","dp","fq","po","np","qq","qr",
"qp","pm","rr","or","no","mp","pk","on","oo","mm","qm","ql","pl",
"qn","pn","rm","om","qk","nn","ip","dn","cf","fc","bd","ci","cc",
"dc","nc","re","rd","od","oc","qd","qc","qe","oe","rc","nd","qb",
"hc","ce","be","df","cg","ge","jd","cl","cq","dq","dr","er","cr",
"eq","bo","hq","iq","hr","hp","ir","jr","fp","gp","gq","fo","fr","dg"];

export const AA_1_W_R = ['pd', 'dd', 'qp', 'dp', 'fq', 'cn', 'kq', 'qf', 'nc', 'pp', 'pq', 'kp', 'lp', 'jq', 'lq', 'qo', 'qq', 'pk', 'qm', 'pm', 'qn', 'eq', 'pi', 'jp', 'ln', 'jn', 'mi', 'mj', 'ni', 'lm', 'mn', 'mm', 'lj', 'lk', 'kk', 'kj', 'li', 'oh', 'jk', 'oi', 'km', 'of', 'qe', 'rf', 'fp', 'jm', 'do', 'co', 'cq', 'fr', 'cp', 'ep', 'pg', 'pf', 'oj', 'pj', 'og', 'ph', 'dn', 'eo', 'qh', 'qi', 'nh', 'pi', 'dm', 'cm', 'cl', 'bl', 'ck', 'bk', 'bo', 'an', 'cj', 'bj', 'ng', 'qg', 'ci', 'bi', 'ch', 'bh', 'fc', 'dr', 'cf', 'ee', 'ge', 'cc', 'db', 'md', 'cb', 'ff', 'gf', 'gg', 'hg', 'gh', 'gj', 'hh', 'ig', 'hj', 'hk', 'gk', 'gl', 'fk', 'fj', 'fl', 'ij', 'hi', 'ek', 'fm', 'eg', 'hl', 'ik', 'dg', 'df', 'gd', 'hd', 'bf', 'ce', 'bd', 'cg', 'be', 'bb', 'bc', 'dc', 'cd', 'fg', 'mc', 'ob', 'nd', 'kc', 'pn', 'ro', 'kd', 'mb', 'jc', 'lc', 'gc', 'fd', 'hc', 'fb', 'id', 'ld', 'he', 'jf', 'je', 'le', 'oc', 'nb', 'rd', 'hf', 'ie', 'jr', 'ir', 'kr', 'kn', 'el', 'is', 'il', 'hm', 'im', 'in', 'hq', 'gn', 'en', 'fo', 'iq', 'gs', 'po', 'nn', 'no', 'kf', 'kg', 'ke', 'on', 'pc', 'qc', 'jh', 'ih', 'od', 'pb', 'rb', 'qb', 'qd', 'rc', 'sc', 'kl', 'jg', 'bg', 'ag', 'af', 'ae', 'if', 'mk', 'fe', 'ef', 'ed', 'de', 'ii', 'nm', 'ah', 'ai', 'om', 'pl', 'ol', 'ok', 'ac', 'bn', 'rk', 'rj', 'qk', 'dl', 'em', 'lf', 'ho', 'hn', 'nj', 'fn', 'ab', 'ah', 'fh', 'nk', 'jb', 'lg', 'kh', 'lh', 'ki', 'ib', 'ja', 'ia', 'kb', 'ql', 'rl', 'gb', 'nl', 'sj', 'rh', 'sh', 'ml', 'll', 'oo', 'rg', 'ad', 'af', 'me', 'nf', 'sd', 'se', 'qj', 'ri', 'ne', 'oe', 'es', 'lo', 'mo', 'ko', 'cr', 'ao'];
export const AA_2_W_R = ['pd', 'dd', 'pp', 'dp', 'pj', 'nc', 'pf', 'nq', 'pn', 'oo', 'po', 'pr', 'fc', 'cf', 'oc', 'qc', 'nb', 'rf', 'rg', 'qg', 're', 'rh', 'rj', 'fq', 'fe', 'mb', 'mc', 'nd', 'lb', 'ec', 'fb', 'og', 'ma', 'oi', 'oj', 'dk', 'dg', 'cg', 'dh', 'ch', 'di', 'bj', 'lg', 'mi', 'ek', 'el', 'fl', 'em', 'nh', 'ni', 'ph', 'pg', 'oh', 'of', 'qf', 'pi', 'qi', 'qh', 'mh', 'sg', 'qd', 'li', 'se', 'le', 'md', 'si', 'ri', 'jh', 'kf', 'if', 'ke', 'gg', 'fk', 'dj', 'il', 'ef', 'fm', 'id', 'hi', 'kd', 'me', 'll', 'gp', 'en', 'fn', 'hc', 'ig', 'ih', 'hf', 'hg', 'ie', 'he', 'jf', 'gf', 'ol', 'qq', 'cc', 'eb', 'cd', 'de', 'db', 'ea', 'be', 'iq', 'km', 'lm', 'jo', 'gq', 'cq', 'rk', 'ro', 'hp', 'ho', 'go', 'oq', 'or', 'np', 'hn', 'hm', 'dq', 'eo', 'do', 'mq', 'nr', 'io', 'fi', 'dr', 'er', 'ej', 'gn', 'in', 'fo', 'mo', 'lp', 'mp', 'gi', 'hj', 'lo', 'hh', 'if', 'gh', 'fh', 'hf', 'nl', 'nk', 'if', 'fg', 'om', 'pl', 'eg', 'hf', 'pe', 'qe', 'if', 'gm', 'fp', 'hf', 'pm', 'qm', 'nm', 'ql', 'kn', 'kl', 'kk', 'jk', 'jm', 'jl', 'jn', 'ff', 'ge', 'mr', 'im', 'gd', 'hd', 'eh', 'fd', 'ed', 'ee', 'fd', 'fa', 'kq', 'kp', 'dl', 'cl', 'rr', 'gb', 'kj', 'lj', 'ki', 'lh', 'mf', 'kh', 'hk', 'rq', 'sp', 'sq', 'ns', 'rs', 'qs', 'sr', 'ss', 'bb', 'cb', 'rs', 'bp', 'br', 'ss', 'qo', 'rs', 'op', 'on', 'sj', 'qj', 'rn', 'qn', 'rp', 'qp', 'so', 'jq', 'jp', 'qo', 'sl', 'rm', 'sm', 'sn', 'pq', 'no', 'rn', 'sf', 'nj', 'sn', 'da', 'ca', 'rn', 'mk', 'lk', 'sn', 'bc', 'ab', 'rn', 'lq', 'sn', 'ir', 'hr', 'is', 'ms', 'ls', 'kr', 'jr', 'ks', 'os', 'ps', 'ms', 'nn', 'oq', 'op', 'nf', 'sp', 'mn', 'ln', 'rl', 'sk', 'oe', 'sh', 'oo', 'ml', 'ng', 'mj', 'qk', 'ok', 'nk', 'mk', 'oq', 'mm', 'rg', 'op', 'rf', 'nk', 'oq', 'ba', 'bd', 'op', 'ip', 'hq', 'oq', 'bf', 'qr', 'ae', 'cr', 'bo', 'ei', 'ii', 'ij', 'ci', 'jd', 'jc', 'aa', 'ac', 'jb', 'je', 'co', 'bn', 'jd', 'if', 'fj', 'gc', 'cm', 'cn', 'hf', 'kc', 'ib', 'ic'];
export const AA_3_W_R = ['pd', 'dd', 'pp', 'dq', 'co', 'qc', 'qd', 'pc', 'nc', 'oc', 'od', 'nb', 'cc', 'cd', 'dc', 'ed', 'ec', 'fc', 'fb', 'fp', 'ci', 'ck', 'ei', 'gb', 'gc', 'fd', 'hb', 'bc', 'ga', 'cb', 'db', 'da', 'eb', 'ek', 'cm', 'cp', 'bp', 'bq', 'fn', 'cg', 'pj', 'qq', 'qp', 'pq', 'oq', 'or', 'nq', 'nr', 'mq', 'oo', 'op', 'mc', 'nd', 'rc', 'rp', 'mr', 'kq', 'rq', 'kk', 'qh', 'ph', 'pg', 'oh', 'rj', 'qg', 'rh', 'bg', 'bh', 'qk', 'qf', 'ch', 'bi', 'cf', 'dg', 'be', 'di', 'df', 'ag', 'bf', 'dh', 'ef', 'ba', 'ab', 'gd', 'hd', 'he', 'gf', 'id', 'hc', 'ge', 'bd', 'ih', 'pf', 'rk', 'rg', 'ql', 'gg', 'if', 'ke', 'jj', 'hj', 'jk', 'bk', 'kf', 'cl', 'bj', 'dk', 'cj', 'jg', 'jf', 'ep', 'eq', 'gp', 'fo', 'go', 'gq', 'lc', 'mb', 'le', 'jh', 'kg', 'ig', 'kl', 'jl', 'km', 'kj', 'hl', 'jm', 'jn', 'lg', 'li', 'lj', 'mi', 'fh', 'gh', 'ki', 'ii', 'in', 'ej', 'bl', 'kn', 'mj', 'nk', 'ni', 'mh', 'qn', 'og', 'gi', 'hi', 'fg', 'ff', 'je', 'om', 'ol', 'kd', 'jd', 'hf', 'hk', 'gk', 'hm', 'eo', 'fq', 'bm', 'ak', 'gn', 'gl', 'rm', 'rn', 'ik', 'io', 'iq', 'jp', 'jq', 'hp', 'hq', 'fl', 'el', 'kp', 'lp', 'lr', 'lq', 'ml', 'ok', 'nl', 'mk', 'lk', 'll', 'mo', 'lo', 'nn', 'pl', 'qm', 'mm', 'nm', 'mn', 'pm', 'qr', 'rr', 'gr', 'fr', 'no', 'np', 'mp', 'no', 'gs', 'em']
export const AA_4_W_R = ['pd', 'dc', 'dq', 'pp', 'de', 'ce', 'cf', 'cd', 'df', 'fc', 'cl', 'nq', 'mp', 'np', 'ql', 'qf', 'mo', 'fq', 'hp', 'go', 'do', 'em', 'dn', 'ho', 'ip', 'io', 'jp', 'lr', 'jo', 'im', 'qp', 'qo', 'po', 'qq', 'rp', 'pn', 'oo', 'no', 'on', 'nn', 'om', 'pq', 'jm', 'ro', 'il', 'hl', 'ik', 'hk', 'hj', 'gj', 'hm', 'in', 'gp', 'jn', 'gi', 'fj', 'fp', 'fi', 'hi', 'fh', 'ci', 'km', 'qe', 'pf', 'nd', 'rm', 'pi', 'mf', 'fl', 'gk', 'rl', 'ph', 'oh', 'qh', 'oi', 'og', 're', 'lc', 'mh', 'le', 'mb', 'eq', 'dr', 'fo', 'eo', 'lb', 'mc', 'ki', 'hg', 'pb', 'pc', 'md', 'ob', 'ge', 'kh', 'nc', 'nb', 'jr', 'ir', 'cj', 'bj', 'bi', 'dj', 'ch', 'di', 'dh', 'gf', 'he', 'ff', 'li', 'bf', 'bh', 'lh', 'ji', 'ij', 'ig', 'ek', 'ih', 'jl', 'eg', 'hf', 'if', 'ed', 'gm', 'lk', 'ko', 'kp', 'ep', 'gr', 'll', 'kl', 'lm', 'mk', 'nl', 'nk', 'ol', 'ml', 'kk', 'kj', 'fe', 'ef', 'mm', 'pm', 'nm', 'qi', 'pk', 'ok', 'lj', 'jk', 'pl', 'qm', 'nj', 'oj', 'rj', 'ri', 'qj', 'fd', 'gc', 'rn', 'rf', 'sj', 'sk', 'sh', 'se', 'rk', 'si', 'gd', 'hc', 'sj', 'dp', 'cp', 'si', 'ne', 'nf', 'sj', 'dm', 'cm', 'si', 'be', 'db', 'sj', 'co', 'cn', 'si', 'bd', 'bc', 'sj', 'cq', 'bo', 'si', 'dd', 'cc', 'sj', 'cr', 'er', 'si', 'lo', 'kn', 'sj', 'bp', 'fr', 'si', 'jh', 'ii', 'sj', 'co', 'kf', 'ni', 'mj', 'mi', 'nh', 'ke', 'cp', 'si', 'je', 'jf', 'sj', 'br', 'aq', 'si', 'pj', 'qk', 'sj', 'ap', 'cs', 'si', 'lf', 'me', 'sj', 'bs', 'ar', 'si', 'ec', 'eb', 'sj', 'hh', 'gh', 'si', 'jd', 'ie', 'sj', 'fg', 'gg', 'si']
export const AA_5_B_R = ['pd', 'cd', 'pp', 'dq', 'ed', 'ec', 'fc', 'dc', 'fd', 'cf', 'co', 'qn', 'mc', 'ld', 'md', 'lf', 'nq', 'cp', 'do', 'fq', 'me', 'pj', 'qh', 'dk', 'fg', 'go', 'qk', 'mp', 'mq', 'kp', 'pk', 'fl', 'ig', 'le', 'dd', 'lc', 'cc', 'cb', 'bc', 'bb', 'ng', 'bd', 'id', 'jh', 'cl', 'ck', 'bk', 'bj', 'bl', 'dl', 'dm', 'em', 'eq', 'ep', 'dp', 'cq', 'er', 'eo', 'cj', 'bi', 'bp', 'bq', 'bo', 'fr', 'aq', 'dn', 'br', 'dr', 'cr', 'es', 'cs', 'qc', 'qd', 'mh', 'qp', 'rd', 're', 'cm', 'bm', 'rb', 'nb', 'ph', 'nh', 'rf', 'qe', 'se', 'qf', 'pb', 'mi', 'jc', 'nn', 'ic', 'hd', 'ml', 'jg', 'li', 'lj', 'mj', 'ni', 'ol', 'kg', 'gb', 'fb', 'jd', 'ok', 'rg', 'qg', 'on', 'kq', 'hc', 'kj', 'ro', 'rp', 'no', 'jp', 'lp', 'jq', 'cn', 'bn', 'hf', 'if', 'gh', 'gg', 'rk', 'pm', 'rl', 'ri', 'pn', 'qm', 'ql', 'pl', 'rm', 'mn', 'om', 'kn', 'qj', 'nj', 'op', 'oq', 'rj', 'lm', 'jo', 'ko', 'sp', 'rq', 'jm', 'jn', 'jk', 'jj', 'mo', 'im', 'hl', 'ia', 'ja', 'sf', 'sg', 'rh', 'mm', 'mk', 'll', 'io', 'km', 'ln', 'kk', 'hj', 'oj', 'nk', 'hn', 'dg', 'eh', 'ga', 'kb', 'cg', 'df', 'eg', 'bg', 'fj', 'ej', 'fh', 'lg', 'kh', 'ir', 'jr', 'in', 'hr', 'sq', 'sr', 'so', 'ef', 'ch', 'ib', 'ha', 'hb', 'gc', 'ha', 'gd', 'ge', 'la', 'mb', 'lb', 'ce', 'bf', 'de', 'jb', 'fa', 'hq', 'iq', 'gr', 'is', 'rr', 'qr', 'ss', 'di', 'ac', 'sh', 'ob', 'sf', 'sd', 'lh', 'oc', 'od', 'hp', 'ei', 'dh', 'ci', 'bh', 'be', 'ae', 'oh', 'hk', 'gk', 'pi', 'pg', 'fk', 'fi', 'eb', 'oa', 'pa', 'sb', 'rc', 'ie', 'gl', 'gj', 'gs', 'ea', 'lq', 'lr', 'da', 'ra', 'qa', 'pc', 'na', 'ma', 'hs', 'ir', 'mg', 'ke', 'nd', 'ne', 'kd', 'nc', 'mf', 'nf', 'qs', 'pr', 'dj', 'po', 'oo', 'aj', 'ai', 'ak', 'je', 'kf', 'ap', 'ar', 'ij', 'ii', 'ik', 'sj', 'sk', 'oa', 'sa', 'na', 'sc', 'si', 'ho', 'ps', 'mr', 'rs', 'fe', 'ee', 'qs', 'af', 'ag', 'rs', 'sr', 'qs', 'gf', 'ff', 'ds', 'nl', 'ls', 'kr', 'nm', 'qo', 'lk', 'nr']
export const AA_6_W_R = ['pd', 'dc', 'pp', 'dq', 'de', 'ce', 'cf', 'cd', 'df', 'fc', 'co', 'fp', 'dl', 'dj', 'gf', 'fj', 'hq', 'fm', 'hm', 'cm', 'en', 'cl', 'go', 'do', 'cp', 'dp', 'cq', 'cr', 'br', 'dr', 'bn', 'dn', 'ei', 'fi', 'kq', 'qn', 'ro', 'lp', 'kp', 'ln', 'oo', 'nm', 'pm', 'pk', 'ok', 'pl', 'mm', 'lq', 'lo', 'mo', 'ko', 'mn', 'om', 'lr', 'jm', 'kr', 'jr', 'pi', 'np', 'oq', 'pq', 'mp', 'nr', 'jn', 'kn', 'lm', 'ol', 'km', 'iq', 'jl', 'im', 'qf', 'oj', 'pj', 'qe', 'rf', 'qm', 're', 'lc', 'bs', 'ar', 'qc', 'pc', 'qb', 'jj', 'nq', 'or', 'kk', 'hc', 'ik', 'ij', 'hk', 'kj', 'gm', 'gd', 'fd', 'fe', 'he', 'hf', 'le', 'em', 'fn', 'ej', 'ek', 'dk', 'el', 'og', 'nh', 'pf', 'mg', 'je', 'qd', 'pe', 'lj', 'oi', 'ph', 'oh', 'li', 'kh', 'ki', 'gb', 'fb', 'bf', 'ci', 'bc', 'ad', 'cc', 'dd', 'db', 'eb', 'bb', 'ca', 'da', 'ba', 'jh', 'lh', 'ac', 'bd', 'aa', 'ab', 'qg', 'pg', 'aa', 'ee', 'eh', 'ab', 'rd', 'rg', 'aa', 'fh', 'ef', 'ab', 'cj', 'di', 'aa', 'gc', 'hb', 'ab', 'ck', 'dm', 'aa', 'ge', 'ff', 'ab', 'fk', 'fl', 'aa', 'hd', 'bi', 'ch', 'bh', 'ab', 'cg', 'pb', 'aa', 'ic', 'id', 'ab', 'ie', 'cb', 'ob', 'gd', 'jc', 'nb', 'oc', 'oa', 'rc', 'rb', 'pa', 'qa', 'rk', 'rj', 'kg', 'rl', 'mb', 'rm', 'rn', 'hn', 'in', 'ho', 'io', 'hp', 'ip', 'gq', 'gr', 'fq', 'ml', 'lk', 'sm', 'qk', 'fr', 'ne', 'nc', 'kf', 'jf', 'hh', 'ih', 'nn', 'mk', 'bk', 'bj', 'er', 'fg', 'hj', 'hl', 'gk', 'op', 'mq', 'bm', 'bl', 'mf', 'nf', 'lf', 'lg', 'ke', 'me', 'kf', 'ng', 'gp', 'gn']
export const AA_7_W_R = ['pd', 'dd', 'qp', 'dp', 'fq', 'cn', 'op', 'qf', 'nc', 'np', 'oq', 'qo', 'po', 'qn', 'rp', 'pj', 'cc', 'dc', 'cd', 'cf', 'ce', 'de', 'bf', 'cb', 'bb', 'bg', 'db', 'be', 'df', 'cg', 'ca', 'bd', 'bc', 'ef', 'jp', 'gn', 'dq', 'cq', 'cr', 'cp', 'er', 'gj', 'fg', 'eh', 'pl', 'ql', 'pm', 'nn', 'km', 'jo', 'io', 'kp', 'ko', 'jn', 'kn', 'jq', 'ip', 'iq', 'lp', 'kq', 'lq', 'hp', 'in', 'lr', 'mr', 'jm', 'hm', 'im', 'hn', 'gq', 'hk', 'jk', 'ep', 'lo', 'mo', 'mq', 'mp', 'nq', 'nr', 'eo', 'fp', 'no', 'mn', 'mm', 'ln', 'kl', 'kr', 'go', 'hj', 'gi', 'hi', 'ji', 'ih', 'kg', 'gr', 'ho', 'gm', 'em', 'gh', 'fl', 'hr', 'hq', 'ie', 'nm', 'qm', 'kd', 'ok', 'if', 'hf', 'jf', 'gk', 'ej', 'he', 'nj', 'oj', 'oi', 'qe', 'pf', 'pi', 'oh', 'nk', 'mj', 'qi', 'rj', 'qj', 'ri', 'qk', 'qc', 'pc', 're', 'rd', 'qd', 'rc', 'pe', 'qb', 'fc', 'hc', 'jc', 'fb', 'nd', 'od', 'mc', 'ne', 'md', 'oe', 'nb', 'qe', 'rg', 'ob', 'pn', 'lf', 'je', 'qh', 'rh', 'mh', 'mk', 'og', 'ng', 'nh', 'ni', 'of', 'se', 'lh', 'oo', 'pp', 'hb', 'gc', 'ib', 'fm', 'en', 'gb', 'mb', 'bq', 'bp', 'ap', 'br', 'ar', 'aq', 'ls', 'kh', 'kj', 'jj', 'li', 'll', 'bq', 'lg', 'mg', 'aq', 'ki', 'jh', 'bq', 'mf', 'me', 'aq', 'fk', 'cs', 'dr', 'ek', 'bq', 'bs', 'ds', 'aq', 'fn', 'fo', 'bq', 'ig', 'hg', 'aq', 'ei', 'fi', 'bq', 'rk', 'ld', 'lc', 'as', 'bo', 'rn', 'rl', 'fh', 'di', 'le', 'fd', 'ro', 'on', 'kb', 'rm', 'nl', 'na', 'oa', 'jb', 'ir', 'jr', 'js', 'ec', 'qd', 'eb', 'ea', 'om', 'pg', 'qg', 'ph', 'ha', 'id', 'jd', 'ao', 'an', 'aq', 'ga', 'fa', 'ff', 'eg', 'dg', 'ml', 'lm', 'fj', 'ei', 'la', 'ja', 'ge', 'sd', 'fe', 'ee', 'sm', 'sl', 'sn', 'sc', 'ad', 'af', 'sb', 'kf', 'gd', 'ae']
export const AA_8_W_R = ['pd', 'dd', 'qp', 'dp', 'np', 'qc', 'qd', 'pc', 'nc', 'oc', 'od', 'nb', 'pj', 'fq', 'gp', 'fp', 'cc', 'cd', 'dc', 'ed', 'ec', 'fc', 'fb', 'cj', 'ei', 'go', 'dg', 'bg', 'rc', 'rb', 'fd', 'gc', 'gb', 'hc', 'fe', 'bc', 'bb', 'be', 'ac', 'nd', 'mc', 'md', 'mb', 'kd', 'rd', 'oa', 'ic', 'lc', 'ne', 'me', 'nf', 'hb', 'mf', 'id', 'cf', 'qk', 'qj', 'pk', 'ok', 'rj', 'ri', 'ol', 'bi', 'ci', 'bf', 'rp', 'ro', 'qo', 'rn', 'rq', 'qq', 'qr', 'pr', 'rl', 'oj', 'rs', 'pn', 'po', 'qn', 'pq', 'om', 'bh', 'cp', 'co', 'bp', 'nl', 'oo', 'pp', 'pl', 'bo', 'dq', 'af', 'bd', 'do', 'er', 'br', 'fr', 'gq', 'cq', 'gr', 'cr', 'ce', 'ij', 'he', 'fk', 'gi', 'gj', 'fi', 'ej', 'fg', 'kp', 'jl', 'hi', 'll', 'mm', 'ko', 'jo', 'jn', 'kn', 'lo', 'in', 'jm', 'lp', 'hk', 'gg', 'eh', 'dh', 'ff', 'hj', 'hm', 'io', 'gf', 'kk', 'gm', 'dk', 'el', 'ck', 'bj', 'hh', 'kg', 'lm', 'kl', 'mj', 'di', 'fj', 'ig', 'fh', 'eg', 'hg', 'lj', 'if', 'mi', 'lk', 'mk', 'ml', 'nj', 'nk', 'jk', 'mj', 'ap', 'aq', 'mk', 'hf', 'ee', 'mj', 'ao', 'bs', 'mk', 'ef', 'df', 'mj', 'jj', 'jg', 'mk', 'nh', 'qi', 'ni', 'jh', 'jf', 'mj', 'sb', 'rh', 'si', 'oi', 'nm', 'qg', 'pi', 'ph', 'rf', 'sj', 'qh', 'ra', 'ke', 'qi', 'jd', 'jc', 'qh', 'mh', 'ng', 'qi', 'ie', 'ib', 'qh', 'eb', 'db', 'qi', 'qb', 'pb', 'qh', 'nr', 'mq', 'qi', 'lf', 'ld', 'qh', 'jq', 'jp', 'qi', 'na', 'ma', 'qh', 'mr', 'lr', 'kr', 'ks', 'qi', 'ge', 'gd', 'qh', 'ga', 'or', 'qi', 'ji', 'sh', 'ql', 'rg']

export const sample_var_at_5 = [[2,13], [9,15], [15,14], [15,11], [13,14], [13,16]];
export const var_fail_suicide = [ [0,1], [0,3], [1,0], [0,0], [3,0]];
export const var_fail_suicide_sgf = ['ab', 'ac', 'ba', 'aa', 'da'];

export function	sgf_to_coord([sgf_x, sgf_y]) {
		var alpha = "abcdefghijklmnopqrstuvwxyz";
		var x = alpha.indexOf(sgf_x.toLowerCase());
		var y = alpha.indexOf(sgf_y.toLowerCase());
		return([x,y])
	}




