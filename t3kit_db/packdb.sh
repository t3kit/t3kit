#!/bin/bash
DB_DB="t3kit"
DB_USER="t3kit"
DB_PW="t3kit1234"
OUT_FILE=${1:-"t3kit.sql"}

CLEAR_TABLES=(
	"cf_cache_hash"
	"cf_cache_hash_tags"
	"cf_cache_pages"
	"cf_cache_pages_tags"
	"cf_cache_pagesection"
	"cf_cache_pagesection_tags"
	"cf_cache_rootline"
	"cf_cache_rootline_tags"
	"cf_extbase_datamapfactory_datamap"
	"cf_extbase_datamapfactory_datamap_tags"
	"cf_extbase_object"
	"cf_extbase_object_tags"
	"cf_extbase_reflection"
	"cf_extbase_reflection_tags"
	"cf_extbase_typo3dbbackend_queries"
	"cf_extbase_typo3dbbackend_queries_tags"
	"cf_tx_solr"
	"cf_tx_solr_tags"
	"tx_solr_statistics"
	"tx_realurl_pathcache"
	"tx_realurl_urlcache"
	"tx_realurl_uniqalias_cache_map"
	"sys_log"
	"sys_history"
	"cf_cache_imagesizes"
	"cf_cache_imagesizes_tags"
	"cache_md5params"
	"cache_treelist"
	"be_sessions"
	"be_users"
	"tx_extensionmanager_domain_model_extension"
	"sys_file_processedfile"
	"fe_sessions"
	"fe_session_data"
	"cf_themes_cache"
	"cf_themes_cache_tags"
	"tx_solr_cache"
	"tx_solr_cache_tags"
	"cf_cache_news_category_tags"
	"cf_cache_news_category"
)


echo "Clearing tables...";
for TABLE in "${CLEAR_TABLES[@]}"
do
	if [ -f "/.dockerenv" ]; then
	mysql -hdb -u "$DB_USER" -p"$DB_PW" -e "TRUNCATE TABLE ${TABLE}" "$DB_DB"
	else
	mysql -u "$DB_USER" -p"$DB_PW" -e "TRUNCATE TABLE ${TABLE}" "$DB_DB"
	fi
done

echo "Dumping db..."
	if [ -f "/.dockerenv" ]; then
	mysqldump -hdb -u "$DB_USER" -p"$DB_PW" "$DB_DB" > /var/www/shared/db/"$OUT_FILE"
	else
	mysqldump -u "$DB_USER" -p"$DB_PW" "$DB_DB" > "$OUT_FILE"
	fi

echo "Output in ${OUT_FILE}"

echo "Merge be_users.sql dump, must include admin user with password admin1234"
	if [ -f "/.dockerenv" ]; then
	cat /var/www/shared/db/be_users.sql >> "/var/www/shared/db/${OUT_FILE}"
	else
	cat be_users.sql >> "${OUT_FILE}"
	fi
